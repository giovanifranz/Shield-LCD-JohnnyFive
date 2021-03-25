var five = require("johnny-five");
var board = new five.Board();

function ButtomLCD(args) {

    if (args > 1000) return "None";

    if (args <= 50) return "Right";

    if (args > 50 && args <= 100) return "Up";

    if (args > 100 && args <= 256) return "Down";

    if (args > 256 && args <= 450) return "Left";

    if (args > 450 && args <= 650) return "Select";

    return "None";  // caso nenhuma condição for atendida
}

board.on("ready", function () {

    const lcd = new five.LCD({
        // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
        // Arduino pin # 8    9   4   5   6   7
        pins: [8, 9, 4, 5, 6, 7],
        backlight: 10,
        rows: 2,
        cols: 16
    });
    // Scale the sensor's data from 0-1023 to 0-10 and log changes
    let sensor = new five.Sensor("A0")

    sensor.on("change", function () {

        let sensorScale = sensor.scaleTo(0, 1023)
        lcd.clear();
        lcd.cursor(0, 0).print(ButtomLCD(sensorScale));
    })
});
