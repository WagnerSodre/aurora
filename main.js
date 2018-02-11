'use strict';

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.send('hello world');
});

// Only works on 3000 regardless of what I set environment port to or how I set
// [value] in app.set('port', [value]).
// app.listen(3000);
app.listen(app.get('port'));

const accessToken = '5QGZLIXIE5TKWBTHH3KOWPBF5YSBAJBP';

// Joke example
// See https://wit.ai/aforaleka/wit-example-joke-bot/

const allJokes = {
  chuck: [
    'Chuck Norris counted to infinity - twice.',
    'Death once had a near-Chuck Norris experience.',
  ],
  tech: [
    'Did you hear about the two antennas that got married? The ceremony was long and boring, but the reception was great!',
    'Why do geeks mistake Halloween and Christmas? Because Oct 31 === Dec 25.',
  ],
  default: [
    'Why was the Math book sad? Because it had so many problems.',
  ],
};

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const handleMessage = ({entities}) => {
  const getJoke = firstEntityValue(entities, 'getJoke');
  const greetings = firstEntityValue(entities, 'greetings');
  const bye = firstEntityValue(entities, 'bye');
  const category = firstEntityValue(entities, 'category');
  const sentiment = firstEntityValue(entities, 'sentiment');
  if (getJoke) {
    if (category) {
      const jokes = allJokes[category];
      console.log(jokes[Math.floor(Math.random() * jokes.length)]);
    } else {
      console.log(allJokes['default'][0]);
    }
  } else if (sentiment) {
    const reply = sentiment === 'positive' ? 'Glad you liked it.' : 'Hmm.';
    console.log(reply);
  } else if (bye) {
    console.log("See ya!");
  } else if (greetings) {
    console.log("hey this is joke bot :)");
  } else {
    console.log("I can tell jokes! Say 'tell me a joke about tech'!");
  }
};

const client = new Wit({accessToken});
interactive(client, handleMessage);
