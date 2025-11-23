---
layout: single
title: "Kommende Veranstaltungen"
permalink: /veranstaltungen/zukunft/
header:
  overlay_color: "#5e616c"
  overlay_filter: "0.5"
---

<div class="events-future">
  
  <div class="events-intro">
    <p>Hier finden Sie alle geplanten Veranstaltungen des Förderverein MINTarium Hamburg e.V. chronologisch sortiert.</p>
    <p><a href="/veranstaltungen/">← Zurück zur aktuellen Übersicht</a></p>
  </div>

  {% comment %} Filter-Buttons {% endcomment %}
  {% include event-filters.html %}

  {% comment %} Filtere zukünftige Events {% endcomment %}
  {% assign now = site.time | date: '%s' %}
  {% assign upcoming_events = '' | split: '' %}

  {% assign all_events = site.events | where: "published", true | sort: "start_date" %}

  {% for event in all_events %}
    {% assign event_start = event.start_date | date: '%s' %}
    {% if event_start >= now %}
      {% assign upcoming_events = upcoming_events | push: event %}
    {% endif %}
  {% endfor %}

  {% if upcoming_events.size > 0 %}
    <div class="events-grid" id="events-container">
      {% for event in upcoming_events %}
        {% include event-card.html event=event is_past=false %}
      {% endfor %}
    </div>

    {% comment %} Info über Anzahl {% endcomment %}
    <div class="events-count">
      Insgesamt {{ upcoming_events.size }} kommende Veranstaltungen
    </div>
  {% else %}
    <div class="events-empty">
      <p>Derzeit sind keine zukünftigen Veranstaltungen geplant. Schauen Sie bald wieder vorbei!</p>
    </div>
  {% endif %}

</div>

{% comment %} JavaScript für Filtering {% endcomment %}
<script src="/assets/js/event-filters.js"></script>
