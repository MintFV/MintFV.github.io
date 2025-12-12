---
layout: single
title: "Vergangene Veranstaltungen"
permalink: /veranstaltungen/archiv/
---

<div class="events-archive">
  
  {% comment %} Filter-Buttons {% endcomment %}
  {% include event-filters.html %}

  {% comment %} Filtere vergangene Events {% endcomment %}
  {% assign now = site.time | date: '%s' %}
  {% assign past_events = '' | split: '' %}

  {% assign all_events = site.events | where: "published", true | sort: "start_date" | reverse %}

  {% for event in all_events %}
    {% assign event_start = event.start_date | date: '%s' %}
    {% if event_start < now %}
      {% assign past_events = past_events | push: event %}
    {% endif %}
  {% endfor %}

  {% if past_events.size > 0 %}
    <div class="events-grid" id="events-container">
      {% for event in past_events %}
        {% include event-card.html event=event is_past=true %}
      {% endfor %}
    </div>

    {% comment %} Info über Anzahl {% endcomment %}
    <div class="events-count">
      Insgesamt {{ past_events.size }} vergangene Veranstaltungen
    </div>
  {% else %}
    <div class="events-empty">
      <p>Noch keine vergangenen Veranstaltungen vorhanden.</p>
    </div>
  {% endif %}

</div>

{% comment %} JavaScript für Filtering {% endcomment %}
<script src="/assets/js/event-filters.js"></script>
