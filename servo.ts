/**
 * Servo Erweiterung für Calliope mini
 */
//% color=#00A9CE icon="\uf085" block="Servo"
namespace calliopeServo {

    /**
     * Setze den Winkel eines Servos (0–180°).
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
     */
    //% block="stoppe Servo %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function stopServo(pin: AnalogPin): void {
        pins.servoSetPulse(pin, 0);
    }

    // interne Hilfsfunktion
    function moveServoCore(pin: AnalogPin, fromDegrees: number, toDegrees: number, duration: number): void {
        fromDegrees = Math.max(0, Math.min(180, fromDegrees));
        toDegrees = Math.max(0, Math.min(180, toDegrees));

        let steps = 50;
        let delay = Math.max(1, Math.idiv(duration, steps));

        for (let i = 0; i <= steps; i++) {
            let t = i / steps;
            let ease = 0.5 - 0.5 * Math.cos(Math.PI * t);
            let current = fromDegrees + (toDegrees - fromDegrees) * ease;
            let pulse = 1075 + (current / 180) * (1750 - 1075);
            pins.servoSetPulse(pin, pulse);
            basic.pause(delay);
        }
    }

    /**
     * Bewegt den Servo sanft (Standarddauer ca. 1000 ms).
     */
    //% blockId=calliopeServo_moveEase block="eine Bewegung an Servo %pin von %fromDegrees|° bis %toDegrees|°"
    //% fromDegrees.min=0 fromDegrees.max=180
    //% toDegrees.min=0 toDegrees.max=180
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function moveServoEase(pin: AnalogPin, fromDegrees: number, toDegrees: number): void {
        moveServoCore(pin, fromDegrees, toDegrees, 1000);
    }

    /**
     * Bewegt den Servo sanft mit einstellbarer Dauer.
     */
    //% blockId=calliopeServo_moveEaseWithDuration
    //% block="eine Bewegung an Servo %pin von %fromDegrees|° bis %toDegrees|° in %duration|ms"
    //% fromDegrees.min=0 fromDegrees.max=180
    //% toDegrees.min=0 toDegrees.max=180
    //% duration.defl=1000
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function moveServoEaseWithDuration(pin: AnalogPin, fromDegrees: number, toDegrees: number, duration: number): void {
        moveServoCore(pin, fromDegrees, toDegrees, duration);
    }
}
