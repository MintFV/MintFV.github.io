/**
 * Event Countdown - Dynamische Anzeige verbleibender Tage bis zum Event
 * Vanilla JavaScript
 */

(function() {
  'use strict';

  // Initialisierung beim DOM-Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
  } else {
    initCountdown();
  }

  function initCountdown() {
    const countdownElement = document.getElementById('event-countdown');

    if (!countdownElement) {
      return; // Kein Countdown auf dieser Seite
    }

    const eventDateString = countdownElement.getAttribute('data-event-date');

    if (!eventDateString) {
      return;
    }

    // Parse Event-Datum
    const eventDate = new Date(eventDateString);
    const now = new Date();

    // Berechne Differenz in Tagen (ignoriere Uhrzeit für Tages-Berechnung)
    const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffTime = eventDay - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Zeige Countdown nur für Events in 1-8 Tagen
    if (diffDays >= 1 && diffDays <= 8) {
      const textElement = document.getElementById('countdown-text');
      const daysText = diffDays === 1 ? 'Tag' : 'Tage';

      textElement.textContent = `⏰ Noch ${diffDays} ${daysText} bis zum Event!`;
      countdownElement.style.display = 'block';
    }
  }

})();
