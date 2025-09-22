/**
 * Servo Erweiterung für Calliope mini
 */
//% color=#00A9CE icon="\uf085" block="Servo"
namespace calliopeServo {

    /**
     * Setze den Winkel eines Servos (0–180°).
     * Umrechnung: 0° = 1075 µs, 180° = 1750 µs
     * @param pin Servo-Steuerpin
     * @param degrees Winkel in Grad (0–180)
     */
    //% block="setze Winkel von Servo %pin auf %degrees|°"
    //% degrees.min=0 degrees.max=180
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function setServoAngle(pin: AnalogPin, degrees: number): void {
        degrees = Math.max(0, Math.min(180, degrees));
        let pulse = 1075 + (degrees / 180) * (1750 - 1075);
        pins.servoSetPulse(pin, pulse);
    }

    /**
     * Bewegt den Servo sanft von einem Winkel zu einem anderen
     * mit Ease-In/Ease-Out Übergang.
     * @param pin Servo-Steuerpin
     * @param fromDegrees Startwinkel (0–180)
     * @param toDegrees Zielwinkel (0–180)
     */
    //% block="eine Bewegung an Servo %pin von %fromDegrees|° bis %toDegrees|°"
    //% fromDegrees.min=0 fromDegrees.max=180
    //% toDegrees.min=0 toDegrees.max=180
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function moveServoEase(pin: AnalogPin, fromDegrees: number, toDegrees: number): void {
        fromDegrees = Math.max(0, Math.min(180, fromDegrees));
        toDegrees = Math.max(0, Math.min(180, toDegrees));

        let steps = 50; // Anzahl der Zwischenschritte
        let delay = 20; // Pause in ms pro Schritt

        for (let i = 0; i <= steps; i++) {
            // t läuft von 0..1
            let t = i / steps;

            // Ease-In-Out (sinusförmig)
            let ease = 0.5 - 0.5 * Math.cos(Math.PI * t);

            // aktueller Winkel
            let current = fromDegrees + (toDegrees - fromDegrees) * ease;

            // in Pulsweite umrechnen
            let pulse = 1075 + (current / 180) * (1750 - 1075);
            pins.servoSetPulse(pin, pulse);

            basic.pause(delay);
        }
    }
}
