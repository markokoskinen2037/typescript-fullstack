type ratingOption = 1 | 2 | 3;

type Result = {
  days: number
  trainingDays: number
  targetReached: boolean
  rating: ratingOption
  ratingExplanation: string
  originalTarger: number
  averageTime: number
};

function exerciseCaltulator(dailyExerciseHours: number[], targetAmount: number): Result {
  if (dailyExerciseHours.length === 0) throw new Error('dailyExerciseHours needs to contain atleast 1 value.');
  if (targetAmount <= 0) throw new Error('Please set a feasible target.');

  const averageTime = dailyExerciseHours.reduce((prev, cur) => prev + cur) / dailyExerciseHours.length;
  const workSum: number = dailyExerciseHours.reduce((prev, cur) => prev + cur);

  let rating: ratingOption;
  let ratingExplanation = '';

  if (workSum < targetAmount) {
    rating = 1;
    ratingExplanation = 'try harder pls.';
  } else if (workSum >= Math.pow(targetAmount, 2)) {
    rating = 3;
    ratingExplanation = 'you are superior';
  } else {
    rating = 2;
    ratingExplanation = 'normal work gj';
  }

  const trainingDays: number = dailyExerciseHours.reduce((prev, cur) => {
    if (cur !== 0) {
      return 1 + prev;
    }
    return prev;
  });

  return {
    averageTime,
    days: dailyExerciseHours.length,
    originalTarger: targetAmount,
    rating,
    ratingExplanation,
    targetReached: workSum >= targetAmount,
    trainingDays,
  };
}
export = exerciseCaltulator;

// if (process.argv.length <= 3) throw new Error('Too few arguments');

// const days: number[] = [];
// let goal = 0;
// for (let index = 2; index < process.argv.length - 1; index++) {
//   const element = process.argv[index];
//   if (isNaN(Number(element))) throw new Error('Exercisedays array must contain only numbers');
//   days.push(Number(element));
// }
// goal = Number(process.argv[process.argv.length - 1]);
// if (isNaN(goal)) throw new Error('Your goal must be a number (last param)');

// console.log(exerciseCaltulator(days, goal));
