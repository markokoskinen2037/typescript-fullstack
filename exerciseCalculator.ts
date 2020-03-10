
type ratingOption = 1 | 2 | 3

type Result = {
    days: number,
    trainingDays: number,
    targetReached: boolean,
    rating: ratingOption,
    ratingExplanation: String,
    originalTarger: number,
    averageTime: number
}


function exerciseCaltulator(dailyExerciseHours: number[], targetAmount: number): Result {

    if (dailyExerciseHours.length === 0) throw new Error("dailyExerciseHours needs to contain atleast 1 value.")
    if (targetAmount <= 0) throw new Error("Please set a feasible target.")

    const averageTime = dailyExerciseHours.reduce((prev, cur) => prev + cur) / dailyExerciseHours.length
    const workSum: number = dailyExerciseHours.reduce((prev, cur) => prev + cur)

    let rating: ratingOption = undefined
    let ratingExplanation: string = ""

    if (workSum < targetAmount) {
        rating = 1
        ratingExplanation = "try harder pls."
    } else if (workSum >= Math.pow(targetAmount, 2)) {
        rating = 3
        ratingExplanation = "you are superior"
    } else {
        rating = 2
        ratingExplanation = "normal work gj"
    }

    const trainingDays: number = dailyExerciseHours.reduce((prev, cur) => {
        if (cur !== 0) {
            return 1 + prev
        }
        return prev
    })

    return {
        averageTime,
        days: dailyExerciseHours.length,
        originalTarger: targetAmount,
        rating,
        ratingExplanation,
        targetReached: workSum >= targetAmount,
        trainingDays
    }

}

console.log(exerciseCaltulator([1, 2, 3, 0, 0, 0], 5))
console.log(exerciseCaltulator([7, 5, 5, 0, 0, 0, 0], 19))
