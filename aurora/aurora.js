exports.talk = function(msg) {
  'use strict';

  let Wit = null;
  let interactive = null;
  Wit = require('node-wit').Wit;

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
    // if (getJoke) {
    //   if (category) {
    //     const jokes = allJokes[category];
    //     return(jokes[Math.floor(Math.random() * jokes.length)]);
    //   } else {
    //     return(allJokes['default'][0]);
    //   }
    // } else if (sentiment) {
    //   const reply = sentiment === 'positive' ? 'Glad you liked it.' : 'Hmm.';
    //   return(reply);
    // }
    if (bye) {
      return("See ya!");
    } else if (greetings) {
      return("Hi, my name is Aurora, how are you?");
    } else {
      return("I can tell jokes! Say 'tell me a joke about tech'!");
    }
  };

  const client = new Wit({accessToken});
  //interactive(client, handleMessage);
let answer;

  return(  client.message(msg)
    .then(function (rsp) {
      if (handleMessage) {
        answer = (handleMessage(rsp));
      } else {
        answer = (JSON.stringify(rsp));
      }
    }).then(() => {
      return answer;
    }).catch(function (err) {
      return console.error(err);
    }));

};

exports.json = function(msg) {
  'use strict';

  let Wit = null;
  let interactive = null;
  Wit = require('node-wit').Wit;

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
    // if (getJoke) {
    //   if (category) {
    //     const jokes = allJokes[category];
    //     return(jokes[Math.floor(Math.random() * jokes.length)]);
    //   } else {
    //     return(allJokes['default'][0]);
    //   }
    // } else if (sentiment) {
    //   const reply = sentiment === 'positive' ? 'Glad you liked it.' : 'Hmm.';
    //   return(reply);
    // }
    if (bye) {
      return("See ya!");
    } else if (greetings) {
      return("Hi, my name is Aurora, how are you?");
    } else {
      return("I can tell jokes! Say 'tell me a joke about tech'!");
    }
  };

  const client = new Wit({accessToken});
  //interactive(client, handleMessage);
let answer;

  return(  client.message(msg)
    .then(function (rsp) {
        answer = (JSON.stringify(rsp));
    }).then(() => {
      return answer;
    }).catch(function (err) {
      return console.error(err);
    }));

};
