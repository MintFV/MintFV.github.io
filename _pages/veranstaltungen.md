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
    <h2 class="events-section-title events-section-title--past">🕒 Letzte vergangene Veranstaltungen</h2>
    <div class="events-grid">
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
      <a href="/feeds/events.ical" class="events-feeds__link">
        📅 iCal-Kalender abonnieren
      </a>
      <a href="/feeds/events.xml" class="events-feeds__link">
        📰 RSS-Feed abonnieren
      </a>
    </div>
  </div>

</div>


---

## Workshops auf Anfrage

### Programmiere den NAO-Roboter

**Termin:** auf Anfrage

[Weitere Informationen](/assets/downloads/MINTarium_FV_Veranstaltungen_NAO_Maerz_2025.jpg){: .btn .btn--info}

---

### Workshop Machine Learning

Entdecke die Welt der künstlichen Intelligenz

**Termin:** auf Anfrage

[Weitere Informationen](/assets/downloads/MINTarium_FV_Machine_Learning_Maerz_2025.jpg){: .btn .btn--info}

---

### Kann eine Maschine Denken?

Künstliche Intelligenz verständlich erklärt: Einblicke und Anwendungen

**Termin:** auf Anfrage

[Weitere Informationen](/assets/downloads/MINTarium_FV_KI_Januar_2025.jpg){: .btn .btn--info}

---

### Der künstlichen Intelligenz auf der Spur

**Termin:** auf Anfrage

[Weitere Informationen](/assets/downloads/MINTarium_FV_Veranstaltungen_KI_August_2023.jpg){: .btn .btn--info}

---

### Energie sparen beim Heizen – Achtung Schimmelgefahr

**Termin:** auf Anfrage

[Weitere Informationen](/assets/downloads/MINTarium_FV_Zimmerwetter_2023.jpg){: .btn .btn--info}

<style>
/* ========================================
   KONTRAST-FIX: WCAG AAA für /veranstaltungen/
   ======================================== */

/* Navigation Links (Archiv, Alle Events) */
.events-navigation__link {
  background-color: #003d82 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 0.8rem 1.5rem !important;
  border-radius: 6px !important;
  border: 2px solid #002855 !important;
  text-decoration: none !important;
  display: inline-block !important;
  margin: 0.5rem !important;
  transition: all 0.3s ease !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2) !important;
}

.events-navigation__link:hover {
  background-color: #002855 !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
  border-color: #001a3d !important;
}

/* Feed Links (iCal, RSS) */
.events-feeds__link {
  background-color: #003d82 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 0.8rem 1.5rem !important;
  border-radius: 6px !important;
  border: 2px solid #002855 !important;
  text-decoration: none !important;
  display: inline-block !important;
  margin: 0.5rem !important;
  transition: all 0.3s ease !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2) !important;
}

.events-feeds__link:hover {
  background-color: #002855 !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
  border-color: #001a3d !important;
}

/* Workshop-Buttons (.btn .btn--info) */
.btn.btn--info {
  background-color: #003d82 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 0.8rem 1.5rem !important;
  border-radius: 6px !important;
  border: 2px solid #002855 !important;
  text-decoration: none !important;
  display: inline-block !important;
  margin: 0.5rem 0 !important;
  transition: all 0.3s ease !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2) !important;
}

.btn.btn--info:hover {
  background-color: #002855 !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
  border-color: #001a3d !important;
}

/* Focus States für Accessibility */
.events-navigation__link:focus,
.events-feeds__link:focus,
.btn.btn--info:focus {
  outline: 3px solid #ffd700 !important;
  outline-offset: 2px !important;
}

/* Kontrast-Werte:
   #003d82 auf #ffffff: 8.59:1 ✅ WCAG AAA
   #ffffff auf #003d82: 8.59:1 ✅ WCAG AAA
*/
</style>
