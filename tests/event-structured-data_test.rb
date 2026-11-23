require 'minitest/autorun'
require 'json'
require 'jekyll'
require 'time'

class EventStructuredDataTest < Minitest::Test
  def setup
    root = File.expand_path('..', __dir__)
    layout = File.read(File.join(root, '_layouts/event.html'), encoding: 'UTF-8')
    assignments = layout.split('<article', 2).first.sub(/\A---.*?---/m, '')
    json_ld = layout[/<script type="application\/ld\+json">\s*(.*?)\s*<\/script>/m, 1]
    @template = Liquid::Template.parse(assignments + json_ld)
    @site = Jekyll::Site.new(Jekyll.configuration('source' => root, 'quiet' => true))
    @page = {
      'title' => 'Testveranstaltung',
      'excerpt' => 'Beschreibung',
      'url' => '/veranstaltungen/test/',
      'start_date' => Time.iso8601('2026-12-01T16:00:00+01:00'),
      'created' => Time.iso8601('2025-12-20T14:43:00+01:00')
    }
  end

  def render_event(overrides = {})
    rendered = @template.render!(
      { 'page' => @page.merge(overrides), 'site' => @site.site_payload['site'] },
      registers: { site: @site }
    )
    JSON.parse(rendered)
  end

  def test_offene_werkstatt_without_cost_has_free_offer_and_performer
    event = render_event('event_type' => 'offene-werkstatt')
    assert_equal 'Förderverein MINTarium Hamburg e. V.', event['performer']['name']
    assert_equal 'Organization', event['performer']['@type']
    assert_equal @site.config['url'], event['performer']['url']
    assert_equal true, event['isAccessibleForFree']
    assert_equal '0', event['offers']['price']
    assert_equal 'EUR', event['offers']['priceCurrency']
    assert_equal 'https://www.mintarium-fv.de/veranstaltungen/test/', event['offers']['url']
    assert_equal '2025-12-20T14:43:00+01:00', event['offers']['validFrom']
    assert_equal 'https://schema.org/InStock', event['offers']['availability']
  end

  def test_explicit_free_and_cancelled_event
    event = render_event('cost' => ' Kostenlos ', 'cancelled' => true, 'created' => nil)
    assert_equal '0', event['offers']['price']
    refute event['offers'].key?('availability')
    refute event['offers'].key?('validFrom')
    assert_equal 'https://schema.org/EventCancelled', event['eventStatus']
  end

  def test_paid_or_unknown_cost_is_not_assumed_free
    paid = render_event('event_type' => 'offene-werkstatt', 'cost' => '5 Euro',
                        'registration_required' => true, 'registration_email' => 'test@example.org')
    refute paid.key?('isAccessibleForFree')
    refute paid['offers'].key?('price')
    unknown = render_event('event_type' => 'sonstige')
    refute unknown.key?('isAccessibleForFree')
    refute unknown.key?('offers')
  end
end
