#!/usr/bin/env ruby
# Script zum Hinzufügen des CREATED-Feldes zu allen bestehenden Events
#
# Regel:
# - Zukünftige Events: CREATED = File-Änderungsdatum (mtime)
# - Vergangene Events: CREATED = Event-Datum (start_date)

require 'yaml'
require 'date'
require 'time'

puts "🚀 Starte Migration: CREATED-Feld zu Events hinzufügen\n\n"

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

      # Skip wenn CREATED bereits existiert
      if frontmatter['created']
        puts "⏭️  [#{index + 1}/#{total_count}] #{File.basename(file)}: CREATED bereits vorhanden"
        skipped_count += 1
        next
      end

      # Lese start_date
      start_date = frontmatter['start_date']
      unless start_date
        puts "⚠️  [#{index + 1}/#{total_count}] #{File.basename(file)}: Kein start_date gefunden"
        error_count += 1
        next
      end

      # Parse Datumswerte
      event_date = DateTime.parse(start_date.to_s)
      now = DateTime.now
      file_mtime = File.mtime(file)

      # Regel: Zukunft = File-Datum, Vergangenheit = Event-Datum
      if event_date > now
        # Zukünftiges Event: Nutze File-Änderungsdatum
        created = file_mtime.strftime('%Y-%m-%d %H:%M')
        reason = "Zukunft → File-Datum"
      else
        # Vergangenes Event: Nutze Event-Datum
        created = event_date.strftime('%Y-%m-%d %H:%M')
        reason = "Vergangenheit → Event-Datum"
      end

      # Füge CREATED nach 'published' ein (oder am Ende der Pflichtfelder)
      lines = frontmatter_text.split("\n")
      new_lines = []
      created_inserted = false

      lines.each do |line|
        new_lines << line

        # Füge CREATED nach published-Zeile ein
        if line.match?(/^published:\s*/) && !created_inserted
          new_lines << "created: #{created}"
          created_inserted = true
        end
      end

      # Fallback: Wenn published nicht gefunden, füge am Ende ein
      unless created_inserted
        new_lines << "created: #{created}"
      end

      # Schreibe neue Datei
      new_content = "---\n#{new_lines.join("\n")}\n---\n#{body}"
      File.write(file, new_content)

      puts "✅ [#{index + 1}/#{total_count}] #{File.basename(file)}: #{created} (#{reason})"
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
puts "Übersprungen: #{skipped_count} Events (bereits CREATED vorhanden)"
puts "Fehler:       #{error_count} Events"
puts "="*60
