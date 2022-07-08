class TrafficLight {
    constructor(red, yellow, green) {
        this.red = red
        this.yellow = yellow
        this.green = green
    }
    switchToRed() {
        this.red.style.background = 'red';
        this.switchToGray([this.yellow, this.green])
    }

    switchToYellow() {
        this.yellow.style.background = 'yellow'
        this.switchToGray([this.red, this.green])
    }

    switchToGreen() {
        this.green.style.background = 'green';
        this.switchToGray([this.red, this.yellow])
    }

    switchToGray(ligths) {
        ligths.forEach((light) => {
            light.style.background = 'gray'
        })
    }

    switchAllToGray() {
        this.switchToGray([this.red, this.yellow, this.green])
    }

}

let red1 = document.getElementById("red1")
let red2 = document.getElementById("red2")
let red3 = document.getElementById("red3")
let yellow1 = document.getElementById("yellow1")
let yellow2 = document.getElementById("yellow2")
let yellow3 = document.getElementById("yellow3")
let green1 = document.getElementById("green1")
let green2 = document.getElementById("green2")
let green3 = document.getElementById("green3")

let tf1 = new TrafficLight(red1, yellow1, green1)
let tf2 = new TrafficLight(red2, yellow2, green2)
let tf3 = new TrafficLight(red3, yellow3, green3)
let switchBtn = document.getElementById('switch_btn')
let switchBtnText = document.getElementById('switch_btn_text')
var intervals = []

function clearIntervals() {
    intervals.forEach(clearInterval)
    intervals = []
}

function initLights() {
    clearIntervals()
    tf1.switchToGreen()
    tf2.switchToRed()
    tf3.switchToRed()
    let baseTime = 1000
    intervals.push(setInterval(() => {
        tf1.switchToYellow()
    }, baseTime));
    intervals.push(setInterval(() => {
        clearInterval(intervals[0])
        tf1.switchToRed()
        tf2.switchToGreen()
    }, baseTime * 2));
    intervals.push(setInterval(() => {
        tf2.switchToYellow()
    }, baseTime * 3));
    intervals.push(setInterval(() => {
        tf2.switchToRed()
        tf3.switchToGreen()
    }, baseTime * 4));
    intervals.push(setInterval(() => {
        tf3.switchToYellow()
    }, baseTime * 5));
    intervals.push(setInterval(initLights, baseTime * 6));
}

var isRunning = true
initLights()

switchBtn.addEventListener('click', (event) => {
    if (isRunning) {
        clearIntervals()
        tf1.switchAllToGray()
        tf2.switchAllToGray()
        tf3.switchAllToGray()
    } else {
        initLights()
    }
    isRunning = !isRunning
})