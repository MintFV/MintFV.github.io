---
layout: archive
title: "Veranstaltungen2"
permalink: /veranstaltungen2/
author_profile: false
---

Liste zuletzt aktualisiert: {{ site.time }}

## Kommende Veranstaltungen

{% assign now = site.time %}
{% assign upcoming = site.posts | sort: "date" %}
<ul>
{% for post in upcoming %}
  {% if post.date > now %}
    <li><strong>{{ post.title }}</strong><br>
      {% assign d = post.date | date: "%H:%M" %}
      {% if d == "00:00" %}
        Zeit: {{ post.date | date: "%d.%m.%Y" }}<br>
      {% else %}
        Zeit: {{ post.date | date: "%d.%m.%Y" }} – {{ d }}<br>
      {% endif %}
      {% if post.event_location %}
        Ort: {{ post.event_location }}<br>
      {% endif %}
    </li>
  {% endif %}
{% endfor %}
</ul>

## Vergangene Veranstaltungen

{% assign past = site.posts | sort: "date" | reverse %}
<ul>
{% for post in past %}
  {% if post.date < now %}
    <li><strong>{{ post.title }}</strong><br>
      {% assign d = post.date | date: "%H:%M" %}
      {% if d == "00:00" %}
        Zeit: {{ post.date | date: "%d.%m.%Y" }}<br>
      {% else %}
        Zeit: {{ post.date | date: "%d.%m.%Y" }} – {{ d }}<br>
      {% endif %}
      {% if post.event_location %}
        Ort: {{ post.event_location }}<br>
      {% endif %}
    </li>
  {% endif %}
{% endfor %}
</ul>

[Zum Archiv →](/year-archive/)
