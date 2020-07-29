const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT, (err)=>{
  if(err){
    console.log('some error occured');
  }else{
    console.log(`Server started at Port  ${PORT}`);
  }
})
app.get('/api/quotes/random', (req,res,next)=> {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});
app.get('/api/quotes',(req,res,next)=>{
  const filterQuotes = quotes.filter(author => {
    return author.person === req.query.person;
  });
  if (req.query.person) {
    res.send({ quotes: filterQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

app.post('/api/quotes', (req, res) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  if (newQuote != '' && newPerson != '') {
    quotes.push({ quote: newQuote, person: newPerson });
    res.send({ quote: { quote: newQuote, person: newPerson } });
  } else {
    res.sendStatus(400);
  }
});

