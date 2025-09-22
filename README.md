# Calliope mini Servo Erweiterung

Eine kleine MakeCode-Erweiterung für den **Calliope mini**, um Servomotoren einfach anzusteuern.  
Der Servo akzeptiert Pulsweiten von **1075 µs (0°)** bis **1750 µs (180°)**.  

---

## 🚀 Verwendung

### Winkel setzen
Mit diesem Block kannst du einen Servo an einem bestimmten Pin auf einen gewünschten Winkel stellen:

setze Winkel von Servo [Pin] auf [Grad]

- **Pin**: Wähle den Pin (z. B. P0, P1, P2 …) über Dropdown.  
- **Grad**: Wert zwischen 0 und 180.  

Die Umrechnung auf Pulsweite erfolgt automatisch.

---

### Servo stoppen
Mit diesem Block kannst du die Ansteuerung eines Servos stoppen:

stoppe Servo [Pin]

Dadurch wird der Pin auf `LOW` gesetzt, und der Servo erhält kein Steuersignal mehr.

---

## 📦 Installation
1. Öffne [MakeCode für Calliope mini](https://makecode.calliope.cc/).  
2. Klicke auf **Erweiterungen**.  
3. Gib die GitHub-URL dieses Repos ein (oder füge die Dateien in ein eigenes Repo ein).  

---

## 📜 Lizenz
MIT
