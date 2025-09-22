/**
 * Servo Erweiterung für Calliope mini
 */
//% color=#00A9CE icon="\uf085" block="Servo"
namespace calliopeServo {
    /**
     * Stoppt den Servo an einem Pin.
     * @param pin Servo-Steuerpin
     */
    //% block="stoppe Servo %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function stopServo(pin: AnalogPin): void {
        pins.digitalWritePin(<DigitalPin>pin, 0);
    }
    
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
        // Begrenzen auf 0–180
        degrees = Math.max(0, Math.min(180, degrees));

        // Umrechnung: linear zwischen 1075 und 1750
        let pulse = 1075 + (degrees / 180) * (1750 - 1075);

        pins.servoSetPulse(pin, pulse);
    }


}
