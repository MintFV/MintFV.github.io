---
layout: single
title: "Kooperationen & Sponsoren"
permalink: /kooperationen/
---

<div class="partner-page">

  <div class="partner-intro">
    <p>Der Förderverein MINTarium Hamburg e.V. ist auf die Unterstützung von Unternehmen, Institutionen und Organisationen angewiesen. Wir danken unseren Sponsoren und Kooperationspartnern herzlich für ihr Engagement!</p>
  </div>

  <section class="partner-section" aria-labelledby="sponsoren-heading">
    <h2 id="sponsoren-heading" class="partner-section__title">🤝 Unsere Sponsoren</h2>
    <div class="partner-grid">
      {% for sponsor in site.data.partner.sponsoren %}
      <article class="partner-card">
        {% if sponsor.logo %}
        <div class="partner-card__logo">
          {% if sponsor.url %}
          <a href="{{ sponsor.url }}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
            <img src="{{ sponsor.logo }}" alt="{{ sponsor.name }} Logo" loading="lazy">
          </a>
          {% else %}
          <img src="{{ sponsor.logo }}" alt="{{ sponsor.name }} Logo" loading="lazy">
          {% endif %}
        </div>
        {% endif %}
        <div class="partner-card__content">
          <h3 class="partner-card__name">
            {% if sponsor.url %}
            <a href="{{ sponsor.url }}" target="_blank" rel="noopener noreferrer">{{ sponsor.name }}</a>
            {% else %}
            {{ sponsor.name }}
            {% endif %}
          </h3>
          {% if sponsor.description %}
          <p class="partner-card__description">{{ sponsor.description }}</p>
          {% endif %}
        </div>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="partner-section" aria-labelledby="kooperationen-heading">
    <h2 id="kooperationen-heading" class="partner-section__title">🏛️ Kooperationspartner</h2>
    <div class="partner-grid">
      {% for koop in site.data.partner.kooperationen %}
      <article class="partner-card">
        {% if koop.logo %}
        <div class="partner-card__logo">
          {% if koop.url %}
          <a href="{{ koop.url }}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
            <img src="{{ koop.logo }}" alt="{{ koop.name }} Logo" loading="lazy">
          </a>
          {% else %}
          <img src="{{ koop.logo }}" alt="{{ koop.name }} Logo" loading="lazy">
          {% endif %}
        </div>
        {% endif %}
        <div class="partner-card__content">
          <h3 class="partner-card__name">
            {% if koop.url %}
            <a href="{{ koop.url }}" target="_blank" rel="noopener noreferrer">{{ koop.name }}</a>
            {% else %}
            {{ koop.name }}
            {% endif %}
          </h3>
          {% if koop.description %}
          <p class="partner-card__description">{{ koop.description }}</p>
          {% endif %}
        </div>
      </article>
      {% endfor %}
    </div>
  </section>

  <div class="partner-contact">
    <h2>Möchten Sie Partner werden?</h2>
    <p>Wenn Sie den Förderverein MINTarium Hamburg e.V. als Sponsor oder Kooperationspartner unterstützen möchten, kontaktieren Sie uns gerne:</p>
    <p><strong>E-Mail:</strong> info [at] mintarium-fv.de</p>
  </div>

</div>
