/**
 * Servo Erweiterung für Calliope mini
 */
//% color=#00A9CE icon="\f6d3" block="Servo"
namespace calliopeServo {

    // Speichert die Bewegungsdauer pro Pin (ms)
    let servoDurations: { [pin: number]: number } = {};

    /**
     * Setze den Winkel eines Servos (0–180°).
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
     * Stoppt den Servo an einem Pin.
     * @param pin Servo-Steuerpin
     */
    //% block="stoppe Servo %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function stopServo(pin: AnalogPin): void {
        pins.servoSetPulse(pin, 0);
    }

    /**
     * Setzt die Bewegungsdauer für einen Servo-Pin.
     * @param pin Servo-Steuerpin
     * @param duration Dauer in ms
     */
    //% block="Bewegungsdauer von Servo %pin auf %duration|ms setzen"
    //% duration.defl=1000
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function setServoDuration(pin: AnalogPin, duration: number): void {
        servoDurations[pin] = Math.max(1, duration);
    }

    /**
     * Bewegt den Servo von einem Winkel zu einem anderen mit Ease-In/Out.
     * Liest automatisch die zuvor eingestellte Dauer für diesen Pin.
     * @param pin Servo-Steuerpin
     * @param fromDegrees Startwinkel (0–180)
     * @param toDegrees Zielwinkel (0–180)
     */
    //% block="eine Bewegung an Servo %pin von %fromDegrees|° bis %toDegrees|°"
    //% fromDegrees.min=0 fromDegrees.max=180
    //% toDegrees.min=0 toDegrees.max=180
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function moveServoFromTo(pin: AnalogPin, fromDegrees: number, toDegrees: number): void {
        fromDegrees = Math.max(0, Math.min(180, fromDegrees));
        toDegrees = Math.max(0, Math.min(180, toDegrees));

        // Dauer für diesen Pin auslesen, Default 1000ms
        let duration = servoDurations[pin] || 1000;

        let steps = 50; // Anzahl der Zwischenschritte
        let delay = Math.max(1, Math.idiv(duration, steps));

        for (let i = 0; i <= steps; i++) {
            let t = i / steps;

            // Ease-In-Out (sinusförmig)
            let ease = 0.5 - 0.5 * Math.cos(Math.PI * t);

            let current = fromDegrees + (toDegrees - fromDegrees) * ease;
            let pulse = 1075 + (current / 180) * (1750 - 1075);
            pins.servoSetPulse(pin, pulse);

            basic.pause(delay);
        }
    }
}
