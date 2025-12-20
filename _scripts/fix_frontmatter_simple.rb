#!/usr/bin/env ruby
# encoding: utf-8

# Reparatur-Script: Fixe das fehlende Newline vor schließendem ---

events_dir = File.join(__dir__, '..', '_events')

total = 0
fixed = 0

puts "🔧 Repariere kaputte Frontmatter..."
puts "=" * 60

Dir.glob(File.join(events_dir, '*.md')).each do |file_path|
  total += 1
  filename = File.basename(file_path)

  content = File.read(file_path, encoding: 'utf-8')

  # Suche nach dem Problem-Pattern: Wert direkt vor --- ohne Newline
  if content.match?(/^([^\n]+)---\n/m)
    # Fixe: Füge Newline vor --- ein
    fixed_content = content.gsub(/^([^\n]+)---\n/m, "\\1\n---\n")

    File.write(file_path, fixed_content, encoding: 'utf-8')
    puts "✅ #{filename} - REPARIERT"
    fixed += 1
  else
    puts "⏭️  #{filename} - OK"
  end
end

puts "=" * 60
puts "Gesamt: #{total} | Repariert: #{fixed}"
