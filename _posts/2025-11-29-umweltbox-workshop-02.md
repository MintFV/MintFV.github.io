---
layout: single
title: "Ferienpass Aktion: Umweltbox (ESP32)"
date: 2025-11-29 13:00:00 +0100
categories:
  - workshop
  - ferien
  - ferienpass
tags:
  - elektronik
  - umwelt
  - esp32
  - 11-19-jahre

# Custom Felder für Veranstaltungen
event_date: "29. November 2025"
event_time: "13:00 - 16:00 Uhr"
event_age: "11-15 Jahre"
event_cost: "Kostenfrei"
event_location: "MINTarium Mümmelmannsberg"
event_registration: "info@mintarium-fv.de"

# Bilder
header:
  image: /assets/images/events/umweltbox.jpg
  teaser: /assets/images/events/umweltbox-thumb.jpg

# Downloads
downloads:
  - title: "Anmeldeformular"
    url: /assets/downloads/anmeldung_umweltbox.pdf
  - title: "Materialliste"
    url: /assets/downloads/materialliste.pdf
---

## Beschreibung

Du baust eine elektronische Umweltbox, mit der du Temperatur und Feuchtigkeit
messen kannst. Die Teilnahme ist **kostenfrei**.

Dies ist eine Forsetzungsveranstaltung. Vorkenntnisse aus dem ersten Umweltbox-Workshop
sind hilfreich, aber nicht zwingend erforderlich.

## Was lernst du?

- Löten von elektronischen Bauteilen
- Programmierung von Mikrocontrollern
- Umweltdaten messen und auswerten

## Anmeldung

Bitte melde dich per E-Mail an: **info@mintarium-fv.de**

{% if page.downloads %}
## Downloads
{% for download in page.downloads %}
- [{{ download.title }}]({{ download.url }})
{% endfor %}
{% endif %}
