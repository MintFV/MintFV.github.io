# Website für Anforderungen

Wir möchten unsere Webpräzenz bei github hosten.
Dort kann man zum Rendern der Website jekyll verwenden.
Für Jekyll gibt es mehrere vorgefertigte Themes. Einige werden noch gepflegt, andere sind outdatet.

Welches Theme, welche Vorgehensweise ist für unseren Anforderungen (siehe unten) am besten geeignet?
Suche auch nach aktuellen Aussagen im Internet. Oder machen wir alles selbst bzw. kopieren uns die wichtigsten Teile aus einem Theme?

## Anforderungen

Unsere Anforderungen an die Website sind:
- Die Website soll responsiv sein und auf verschiedenen Geräten gut aussehen.
- Die Inhalte sollen leicht zu aktualisieren sein, idealerweise über ein einfaches CMS oder aber es sind templates auszufüllen.
- über ein Sandwichmenü (Hamburger Menü) sollen die verschiedenen Seiten erreichbar sein, ebenso einige ausgewählte externe Links (z.B. zu Social Media, github projekte, Mintarium).


### Inhalte und Aufbau

- es soll eine Einstiegsseite geben mit unserem Logo in "groß" damit man gleich sieht, was zu uns gehört
- es soll zukünftige Verstanstaltungsankündigungen geben für verschiedene Veranstaltungstypen
    - es gibt Serien von Verstanstaltungen zu verschiedenen Datümern
    - es gibt Einzelveranstaltungen
    - es gibt Dauerangbote auf Anfrage
- Impressum, Datenschutz usw. sind als einzelne Seiten vorhanden
- für alle Veranstaltungstypen gibt es eine einheitliche Struktur
    - Titel
    - Datum / Zeit
    - Ort (ggf. mit Link zu einer Karte)
    - Beschreibung
    - Anmeldung (ggf. mit Link zu einem externen Anmeldesystem)
    - Ansprechpartner (Name, E-Mail, ggf. Telefon)
- für alle Veranstaltungstypen gilt,
    - dass in stattgefundene Verstaltungstermine Bilder von der Verstanstaltung gezeigt werden können
    - in Ankündigigen Bilder verwendet werden können, um die Veranstaltung zu illustrieren



### Pflege der Website

- idealerweiese kann man für jeden Verstaltungstyp eine Art Schablone haben.

#### Inhalte Einpfleger

Wenig bis gar nicht technisch versierte Menschen. Ggf. kann man diesen Menschen eine einfache Schritt für Schritt Anleitung an die Hand geben.

### Technologie

- ggf. kann man auch ein CMS, was jekyll bei github benutzt, verwenden

## bisherige Webseite / Übernahme der Daten

- <https://www.mintarium-fv.de/>

im Wesentlichen ist das eine Single-Page Website, analysiere diese, wenn es Dir möglich ist.

## Prmopt für Decap + Verstanstaltungsseite

@workspace für unsere Vereinswebsite habe ich mit jekyll angefangen einige Dateien und Konfigurationen anzulegen. Wir publishen diese Dateien via github. Zur vereinfachten Bearbeitung soll decap benutzt werden. Vor allem für unsere verschiedenen Veranstaltungen

- Mach mit Mathe - Austellung
- offene Werkstatt
- Ferienpass Aktionen
- sonstige Veranstaltungen

die offene Werkstatt ist ca. zweimal im Monat, die Mach mit Mathe Austellung ist einmal im Monat, die Ferienpass Aktionen finden zweimal im Jahr statt, von den sonstigen Verstaltungen gibt es ca. 6 im Jahr.

Die Frage ist, wie wir für Vereinsmitglieder, die von Technik keine Ahnung haben, em einfachsten auf der decap Weboberfläche abbilden und ggf. auch in jekyll?
