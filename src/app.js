import express from 'express';

const app = express();

const myArr = [];
let counter = 0;

app.get('/', (req, res) => {
  res.json({
    myArr,
  });
  counter += 1;
  myArr.push(counter);
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('the app started on port 3000'));
