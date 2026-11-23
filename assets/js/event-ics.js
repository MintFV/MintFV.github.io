/**
 * Einzel-Termin als .ics Datei herunterladen
 * Vanilla JavaScript - passt zu event-countdown.js
 */
(function() {
  'use strict';

  function formatIcalDate(dateStr) {
    const clean = (dateStr || '').replace(/[-:]/g, '').replace(' ', 'T');
    return clean.length === 13 ? clean + '00' : clean.slice(0, 15);
  }

  function escapeIcalText(str) {
    return (str || '')
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n');
  }

  function initSingleIcsDownload() {
    const btn = document.getElementById('download-single-ics');
    if (!btn) {
      return;
    }

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const d = btn.dataset;
      const nowUtc = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';

      const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//MintFV//SingleEvent//DE',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VTIMEZONE',
        'TZID:Europe/Berlin',
        'TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin',
        'X-LIC-LOCATION:Europe/Berlin',
        'BEGIN:DAYLIGHT',
        'TZOFFSETFROM:+0100',
        'TZOFFSETTO:+0200',
        'TZNAME:CEST',
        'DTSTART:19700329T020000',
        'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
        'END:DAYLIGHT',
        'BEGIN:STANDARD',
        'TZOFFSETFROM:+0200',
        'TZOFFSETTO:+0100',
        'TZNAME:CET',
        'DTSTART:19701025T030000',
        'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
        'END:STANDARD',
        'END:VTIMEZONE',
        'BEGIN:VEVENT',
        'UID:' + d.uid,
        'DTSTAMP:' + nowUtc,
        'DTSTART;TZID=Europe/Berlin:' + formatIcalDate(d.start),
        'DTEND;TZID=Europe/Berlin:' + formatIcalDate(d.end),
        'SUMMARY:' + escapeIcalText(d.title),
        'LOCATION:' + escapeIcalText(d.location),
        'DESCRIPTION:' + escapeIcalText(d.description + '\n\nMehr Infos: ' + d.url),
        'URL:' + d.url,
        'STATUS:' + (d.cancelled === 'true' ? 'CANCELLED' : 'CONFIRMED'),
        'BEGIN:VALARM',
        'TRIGGER:-PT24H',
        'ACTION:DISPLAY',
        'DESCRIPTION:Morgen: ' + escapeIcalText(d.title),
        'END:VALARM',
        'BEGIN:VALARM',
        'TRIGGER:-PT1H',
        'ACTION:DISPLAY',
        'DESCRIPTION:In 1 Stunde: ' + escapeIcalText(d.title),
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ];

      const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = (d.slug || 'mintarium-termin') + '.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });

    const icon = document.getElementById('download-single-ics-icon');
    if (icon) {
      icon.addEventListener('click', function(e) {
        e.preventDefault();
        btn.click();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSingleIcsDownload);
  } else {
    initSingleIcsDownload();
  }
})();
