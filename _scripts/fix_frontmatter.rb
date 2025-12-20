#!/usr/bin/env ruby
# encoding: utf-8

# Reparatur-Script: Fixe kaputte Frontmatter in Events
# Problem: Das schließende --- wurde beim Sequence-Einfügen entfernt

require 'yaml'

events_dir = File.join(__dir__, '..', '_events')

total_count = 0
fixed_count = 0

puts "🔧 Starte Reparatur: Fixe kaputte Frontmatter..."
puts "=" * 70

Dir.glob(File.join(events_dir, '*.md')).each do |file_path|
  total_count += 1

  content = File.read(file_path, encoding: 'utf-8')

  # Prüfe ob Frontmatter kaputt ist (fehlendes newline vor ---)
  if content =~ /\A---\s*\n(.*?)---\s*\n(.*)$/m
    # Frontmatter ist OK
    puts "✅ #{File.basename(file_path)} - OK"
    next
  end

  # Versuche kaputte Frontmatter zu reparieren
  # Pattern: --- am Ende eines Wertes ohne Newline
  if content =~ /\A---\s*\n(.*?)(---.*?)$/m
    frontmatter_and_broken = $1
    rest = $2

    # Trenne das angehängte --- vom letzten Wert
    if frontmatter_and_broken =~ /(.*)(\n[^:\n]+:.*)$/m
      frontmatter_clean = $1
      last_line = $2.strip

      # Extrahiere Body (alles nach ---)
      if rest =~ /^---\s*\n?(.*)$/m
        body = $1
      else
        body = rest
      end

      # Rekonstruiere die Datei
      new_content = "---\n#{frontmatter_clean}\n#{last_line}\n---\n#{body}"

      File.write(file_path, new_content, encoding: 'utf-8')
      puts "🔧 #{File.basename(file_path)} - REPARIERT"
      fixed_count += 1
    else
      puts "⚠️  #{File.basename(file_path)} - KONNTE NICHT REPARIERT WERDEN"
    end
  else
    puts "⚠️  #{File.basename(file_path)} - UNBEKANNTES FORMAT"
  end
end

puts "=" * 70
puts "🎉 Reparatur abgeschlossen!"
puts "Gesamt: #{total_count} Events"
puts "Repariert: #{fixed_count} Events"
