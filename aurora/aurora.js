getClientIp = function(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

request = function(url){
  const https = require("https");
  return new Promise(function(resolve, reject) {
  https.get(url, res => {
  res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      resolve(body);
    });
    })
  });
}

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
    const intent = firstEntityValue(entities, 'intent');
    const location = firstEntityValue(entities, 'location');
    const music_query = firstEntityValue(entities, 'music_query');
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
    if (intent) {
      if (intent == 'weather') {
        if(location){
          const geoAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBzXEyuX4wth8h3_7ZG4zRFsfFANhAuxmk`
          return (request(geoAPI)
            .then((data)=>{
            console.log(data)
            const coordinates = data['results'][0].geometry.location;
            console.log(coordinates);
            const weatherAPI = `https://api.darksky.net/forecast/0a1fb4cb2127d000a0f4f5ed3620ad3e/${coordinates.lat},${coordinates.lng}?units=si`;
           return (request(weatherAPI)
              .then((data)=>{
            console.log("in");
            return(`I saw on the news that temperature is of ${data.currently.temperature}°C`);
           }))
          }))
        }else{
          const geoip = require('geoip-lite');
          const requestIp = require('request-ip');
 
          //@todo implement request-ip (talk with fernando about it)
 
          const geo = geoip.lookup(ip);
          console.log(geo);
          const weatherAPI = `https://api.darksky.net/forecast/0a1fb4cb2127d000a0f4f5ed3620ad3e/${lat},${lng}?units=si`;
          return (request(weatherAPI)
              .then((data)=>{
            console.log("in");
            return(`I saw on the news that temperature is of ${data.currently.temperature}°C`);
           }))
        }
      } else if (intent == 'music') {
        console.log("Music: "+music_query);
        let musicURL = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${music_query}&api_key=1c11b988e99c537cf62ec21d21ee2b50&format=json`;
          return (request(musicURL)
              .then((data)=>{
                var music = (data.results.trackmatches.track[0]);
                musicURL = `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${music.artist}&track=${music.name}&api_key=1c11b988e99c537cf62ec21d21ee2b50&format=json`;
                return (request(musicURL)
                    .then((data)=>{
                  var similarMusics = (data.similartracks.track);
                  return(`WOW! You have a good taste in music, have you ever listened to ${similarMusics[0].name} too?`);
                }))
           }))
      } 
    } else if (bye) {
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

  const client = new Wit({accessToken});
  //interactive(client, handleMessage);
  let answer;

  return(  client.message(msg)
    .then(function (rsp) {
        return rsp;
    }).catch(function (err) {
      return console.error(err);
    }));

};
