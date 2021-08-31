const app = require('express')()

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listens on ${PORT}`);
})