/**
 * Event Filters - Client-seitige Filterung für Veranstaltungen
 * Vanilla JavaScript, keine Framework-Abhängigkeiten
 */

(function() {
  'use strict';

  // Initialisierung beim DOM-Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    const eventsContainer = document.getElementById('events-container');
    const eventCountDisplay = document.getElementById('event-count');

    // Prüfe ob Filter vorhanden sind
    if (!filterButtons.length || !eventsContainer) {
      return;
    }

    // Hole alle Event-Karten
    const allEventCards = Array.from(eventsContainer.querySelectorAll('.event-card'));

    // Aktueller Filter (default: 'all')
    let currentFilter = 'all';

    // Event-Listener für jeden Filter-Button
    filterButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        const filterValue = this.getAttribute('data-filter');

        // Aktiviere den geklickten Button, deaktiviere andere
        filterButtons.forEach(btn => btn.classList.remove('event-filter-btn--active'));
        this.classList.add('event-filter-btn--active');

        // Setze aktuellen Filter
        currentFilter = filterValue;

        // Führe Filterung aus
        filterEvents(filterValue, allEventCards, eventCountDisplay);
      });
    });

    // Initiale Anzeige (alle Events)
    updateEventCount(allEventCards.length, eventCountDisplay);
  }

  /**
   * Filtert Events basierend auf dem ausgewählten Typ
   * @param {string} filterValue - 'all' oder event_type (z.B. 'mach-mit-mathe')
   * @param {Array} eventCards - Array von Event-Card DOM-Elementen
   * @param {HTMLElement} countDisplay - Element für Event-Anzahl-Anzeige
   */
  function filterEvents(filterValue, eventCards, countDisplay) {
    let visibleCount = 0;

    eventCards.forEach(card => {
      const eventType = card.getAttribute('data-event-type');

      if (filterValue === 'all' || eventType === filterValue) {
        // Zeige Event
        card.style.display = '';
        card.setAttribute('aria-hidden', 'false');
        visibleCount++;

        // Animation beim Einblenden
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        // Verstecke Event
        card.style.display = 'none';
        card.setAttribute('aria-hidden', 'true');
      }
    });

    // Aktualisiere Anzahl-Anzeige
    updateEventCount(visibleCount, countDisplay);

    // Scroll sanft nach oben zur Event-Liste
    const filterSection = document.querySelector('.event-filters');
    if (filterSection && window.scrollY > filterSection.offsetTop) {
      window.scrollTo({
        top: filterSection.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Aktualisiert die Anzeige der gefilterten Event-Anzahl
   * @param {number} count - Anzahl der sichtbaren Events
   * @param {HTMLElement} displayElement - Element für Anzeige
   */
  function updateEventCount(count, displayElement) {
    if (!displayElement) return;

    const text = count === 1
      ? '1 Veranstaltung gefunden'
      : `${count} Veranstaltungen gefunden`;

    displayElement.textContent = text;

    // Accessibility: Announce to screen readers
    displayElement.setAttribute('aria-live', 'polite');
  }

})();

/* Die fadeIn Animation sollte im events.css definiert werden. */
