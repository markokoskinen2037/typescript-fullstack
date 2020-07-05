function bmiCalc(height: number, weight: number): string {
  if (height <= 0 || weight <= 0) throw new Error('Invalid params')

  const bmi: number = weight / (((height / 100) * height) / 100)

  if (bmi < 18.5) {
    return 'You weigh too little'
  }
  if (bmi < 25) {
    return 'You are normal weight'
  }
  return 'You are weigh too much'
}
export = bmiCalc

// try {
//   if (process.argv.length < 4) throw new Error('Too few arguments')
//   if (process.argv.length > 4) throw new Error('Too many arguments')

//   const height = Number(process.argv[2])
//   const weight = Number(process.argv[3])
//   const result = bmiCalc(height, weight)
//   console.log(result)
// } catch (e) {
//   throw new Error('Arguments should be numbers.')
// }
