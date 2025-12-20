#!/usr/bin/env ruby
# encoding: utf-8

# Migration Script: Füge SEQUENCE Feld zu allen Events hinzu
#
# SEQUENCE-Logik:
# - Neue Events: SEQUENCE = 0
# - Events mit last_modified: SEQUENCE = 1 (mindestens 1 Revision)
# - Alle anderen: SEQUENCE = 0
#
# SEQUENCE ist ein Integer-Feld (kein Timestamp!)

require 'yaml'
require 'date'

# Pfad zum Events-Ordner
events_dir = File.join(__dir__, '..', '_events')

# Zähler
total_count = 0
updated_count = 0
skipped_count = 0

puts "🚀 Starte Migration: Füge SEQUENCE-Feld zu allen Events hinzu..."
puts "=" * 70

Dir.glob(File.join(events_dir, '*.md')).each do |file_path|
  total_count += 1

  # Lese Datei
  content = File.read(file_path, encoding: 'utf-8')

  # Parse Frontmatter (mit flexiblem Pattern für fehlendes Newline vor ---)
  if content =~ /\A---\s*\n(.*?)---\s*\n(.*)$/m
    frontmatter_text = $1
    body = $2

    begin
      frontmatter = YAML.load(frontmatter_text)

      # Prüfe ob SEQUENCE bereits existiert
      if frontmatter.key?('sequence')
        puts "⏭️  Überspringe #{File.basename(file_path)} (hat bereits SEQUENCE: #{frontmatter['sequence']})"
        skipped_count += 1
        next
      end

      # Berechne SEQUENCE
      # Logik: Wenn last_modified existiert, mindestens 1 Revision (SEQUENCE=1), sonst 0
      sequence_value = if frontmatter.key?('last_modified') && frontmatter['last_modified']
        1  # Mind. 1 Revision
      else
        0  # Neue/unmodifizierte Events
      end

      # Füge SEQUENCE nach last_modified ein (oder nach created, falls last_modified fehlt)
      lines = frontmatter_text.lines
      insert_index = nil

      lines.each_with_index do |line, index|
        if line =~ /^last_modified:\s/
          insert_index = index + 1
          break
        elsif line =~ /^created:\s/ && !insert_index
          insert_index = index + 1
        end
      end

      # Fallback: Nach published einfügen
      unless insert_index
        lines.each_with_index do |line, index|
          if line =~ /^published:\s/
            insert_index = index + 1
            break
          end
        end
      end

      if insert_index
        # Füge SEQUENCE ein
        lines.insert(insert_index, "sequence: #{sequence_value}\n")

        # Schreibe Datei zurück - WICHTIG: Stelle sicher, dass --- auf eigener Zeile steht!
        new_frontmatter = lines.join
        # Entferne angehängtes --- falls vorhanden
        new_frontmatter = new_frontmatter.gsub(/^([^\n]+)---\s*$/, "\\1\n---\n")

        new_content = "---\n#{new_frontmatter}#{body}"
        File.write(file_path, new_content, encoding: 'utf-8')

        puts "✅ #{File.basename(file_path)}: SEQUENCE = #{sequence_value}"
        updated_count += 1
      else
        puts "⚠️  Konnte SEQUENCE nicht einfügen in #{File.basename(file_path)} (keine passende Position gefunden)"
      end

    rescue => e
      puts "❌ Fehler beim Parsen von #{File.basename(file_path)}: #{e.message}"
    end
  else
    puts "⚠️  Keine gültige Frontmatter in #{File.basename(file_path)}"
  end
end

puts "=" * 70
puts "🎉 Migration abgeschlossen!"
puts "Gesamt: #{total_count} Events"
puts "Aktualisiert: #{updated_count} Events"
puts "Übersprungen: #{skipped_count} Events (bereits SEQUENCE vorhanden)"
puts ""
puts "💡 Hinweis: SEQUENCE startet bei 0 und wird automatisch bei jeder Bearbeitung erhöht."
