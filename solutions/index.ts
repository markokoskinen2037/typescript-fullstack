import express from 'express'

const app = express()

const PORT = 3000

app.get('/hello', (_req, res) => {
  return res.status(200).send('Hello Full Stack')
})

app.listen(PORT, () => {
  console.log('Server ready on port', PORT)
})
