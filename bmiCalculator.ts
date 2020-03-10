
function bmiCalc(height: number, weight: number): string {

    if (height <= 0 || weight <= 0) return "Invalid parameters."

    const bmi: number = weight / (height / 100 * height / 100)

    if (bmi < 18.5) {
        return "You weigh too little"
    }
    if (bmi < 25) {
        return "You are normal weight"
    }
    return "You are weigh too much"

}

console.log(bmiCalc(180, 80))
console.log(bmiCalc(0, 10))

