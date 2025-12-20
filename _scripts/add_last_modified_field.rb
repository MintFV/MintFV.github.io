#!/usr/bin/env ruby
# Script zum Hinzufügen des LAST-MODIFIED-Feldes zu allen bestehenden Events
#
# Regel:
# - Initial: LAST-MODIFIED = CREATED (wenn vorhanden)
# - Fallback: LAST-MODIFIED = CREATED = Event-Datum/File-Datum

require 'yaml'
require 'date'
require 'time'

puts "🚀 Starte Migration: LAST-MODIFIED-Feld zu Events hinzufügen\n\n"

event_files = Dir.glob('_events/*.md').sort
total_count = event_files.length
updated_count = 0
skipped_count = 0
error_count = 0

event_files.each_with_index do |file, index|
  begin
    content = File.read(file)

    # Parse Frontmatter
    if content =~ /\A---\s*\n(.*?)\n---\s*\n/m
      frontmatter_text = $1
      frontmatter = YAML.load(frontmatter_text)
      body = content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')

      # Skip wenn LAST-MODIFIED bereits existiert
      if frontmatter['last_modified']
        puts "⏭️  [#{index + 1}/#{total_count}] #{File.basename(file)}: LAST-MODIFIED bereits vorhanden"
        skipped_count += 1
        next
      end

      # Bestimme LAST-MODIFIED Wert
      last_modified = nil
      reason = nil

      # 1. Priorität: CREATED verwenden (wenn vorhanden)
      if frontmatter['created']
        last_modified = frontmatter['created']
        reason = "CREATED vorhanden"

      # 2. Fallback: Wie bei CREATED-Logik
      elsif frontmatter['start_date']
        start_date = frontmatter['start_date']
        event_date = DateTime.parse(start_date.to_s)
        now = DateTime.now
        file_mtime = File.mtime(file)

        if event_date > now
          # Zukünftiges Event: Nutze File-Datum
          last_modified = file_mtime.strftime('%Y-%m-%d %H:%M')
          reason = "Zukunft → File-Datum"
        else
          # Vergangenes Event: Nutze Event-Datum
          last_modified = event_date.strftime('%Y-%m-%d %H:%M')
          reason = "Vergangenheit → Event-Datum"
        end
      else
        puts "⚠️  [#{index + 1}/#{total_count}] #{File.basename(file)}: Kein start_date oder created gefunden"
        error_count += 1
        next
      end

      # Füge LAST-MODIFIED nach 'created' ein (oder nach 'published')
      lines = frontmatter_text.split("\n")
      new_lines = []
      last_modified_inserted = false

      lines.each do |line|
        new_lines << line

        # Füge LAST-MODIFIED nach created oder published ein
        if (line.match?(/^created:\s*/) || line.match?(/^published:\s*/)) && !last_modified_inserted
          new_lines << "last_modified: #{last_modified}"
          last_modified_inserted = true
        end
      end

      # Fallback: Wenn weder created noch published gefunden, füge am Ende ein
      unless last_modified_inserted
        new_lines << "last_modified: #{last_modified}"
      end

      # Schreibe neue Datei
      new_content = "---\n#{new_lines.join("\n")}\n---\n#{body}"
      File.write(file, new_content)

      puts "✅ [#{index + 1}/#{total_count}] #{File.basename(file)}: #{last_modified} (#{reason})"
      updated_count += 1

    else
      puts "❌ [#{index + 1}/#{total_count}] #{File.basename(file)}: Kein gültiges Frontmatter"
      error_count += 1
    end

  rescue => e
    puts "❌ [#{index + 1}/#{total_count}] #{File.basename(file)}: FEHLER - #{e.message}"
    error_count += 1
  end
end

puts "\n" + "="*60
puts "🎉 Migration abgeschlossen!"
puts "="*60
puts "Gesamt:       #{total_count} Events"
puts "Aktualisiert: #{updated_count} Events"
puts "Übersprungen: #{skipped_count} Events (bereits LAST-MODIFIED vorhanden)"
puts "Fehler:       #{error_count} Events"
puts "="*60
