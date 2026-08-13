---
layout: single
title: "Veranstaltungen"
permalink: /veranstaltungen/
---

<div class="events-overview">
  
  <div class="events-intro">
    <p>Hier finden Sie unsere aktuellen und kommenden Veranstaltungen. Von interaktiven Mathematik-Ausstellungen über offene Werkstätten bis hin zu Ferienpass-Aktionen – entdecken Sie das vielfältige Angebot des Förderverein MINTarium Hamburg e.V.</p>
  </div>

  {% comment %} Berechne jetzt und filtere Events {% endcomment %}
  {% assign now = site.time | date: '%s' %}
  {% assign upcoming_events = '' | split: '' %}
  {% assign past_events = '' | split: '' %}

  {% comment %} Sortiere alle veröffentlichten Events {% endcomment %}
  {% assign all_events = site.events | where: "published", true | sort: "start_date" %}

  {% for event in all_events %}
    {% assign event_start = event.start_date | date: '%s' %}
    {% if event_start >= now %}
      {% assign upcoming_events = upcoming_events | push: event %}
    {% else %}
      {% assign past_events = past_events | push: event %}
    {% endif %}
  {% endfor %}

  {% comment %} Nimm die ersten 4 zukünftigen Events {% endcomment %}
  {% assign upcoming_display = upcoming_events | slice: 0, 4 %}
  
  {% comment %} Nimm die letzten 2 vergangenen Events (neueste zuerst) {% endcomment %}
  {% assign past_events_reversed = past_events | reverse %}
  {% assign past_display = past_events_reversed | slice: 0, 2 %}

  {% if upcoming_display.size > 0 %}
    <h2 class="events-section-title">📅 Nächste Veranstaltungen</h2>
    <div class="events-grid">
      {% for event in upcoming_display %}
        {% include event-card.html event=event is_past=false %}
      {% endfor %}
    </div>
  {% endif %}

{% if past_display.size > 0 %}
  <div class="events-past-highlight" markdown="1">
  <span style="opacity: 0.7;">⏳ 🕒</span> **Letzte vergangene Veranstaltungen**
  ---------------------------------------------------------------------------------
  {% for event in past_display %}
    {% include event-card.html event=event is_past=true %}
  {% endfor %}
  </div>
{% endif %}

  {% comment %} Hinweis wenn keine Events vorhanden {% endcomment %}
  {% if upcoming_display.size == 0 and past_display.size == 0 %}
    <div class="events-empty">
      <p>Derzeit sind keine Veranstaltungen geplant. Schauen Sie bald wieder vorbei!</p>
    </div>
  {% endif %}

  {% comment %} Links zu Archiv-Seiten {% endcomment %}
  <nav class="events-navigation">
    {% if upcoming_events.size > 4 %}
      <a href="/veranstaltungen/zukunft/" class="events-navigation__link">
        Alle kommenden Veranstaltungen ansehen →
      </a>
    {% endif %}

    {% if past_events.size > 2 %}
      <a href="/veranstaltungen/archiv/" class="events-navigation__link">
        Vergangene Veranstaltungen ansehen →
      </a>
    {% endif %}
  </nav>

  {% comment %} iCal/RSS Feeds {% endcomment %}
  <div class="events-feeds">
    <h2>📅 Veranstaltungen abonnieren</h2>
    <p>Bleiben Sie auf dem Laufenden:</p>
    <div class="events-feeds__links">

    <a href="javascript:window.location.href='webcal://' + window.location.host + '/feeds/mintfv-events.ical'" class="events-feeds__link">
        📅 iCal-Kalender abonnieren
      </a>
      <a href="/feeds/mintfv-events.xml" class="events-feeds__link">
        📰 RSS-Feed abonnieren
      </a>
    </div>
  </div>

</div>

