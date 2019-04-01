// {"token_type":"bearer","access_token":"AAAAAAAAAAAAAAAAAAAAAIb19gAAAAAAY1ozuEmN%2BPqdpA5rXm%2FwG2Qf4Cg%3Dv2aixiExWlsKL3wE4SF9m52um6ovUXVWdQe7aZYDwFqPFmiB9I"}⏎
const brain = require("brain.js");
const request = require("request");
const network = new brain.recurrent.LSTM();

const options = {
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kanyewest&count=100',
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAIb19gAAAAAAY1ozuEmN%2BPqdpA5rXm%2FwG2Qf4Cg%3Dv2aixiExWlsKL3wE4SF9m52um6ovUXVWdQe7aZYDwFqPFmiB9I'
    }
};

var info = [];
var kanye_tweets = new Array();

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      info = JSON.parse(body);
      info.forEach(tweet => {
          kanye_tweets.push(tweet.text);
      });
      console.log(kanye_tweets);
    }
}

/*




IT MIGHT BE A TIMEOUT ISSUE - ADD A TIMEOUT TO THE JSON REQUEST OR SOMETHING




*/

request(options, callback);

const kanye_tweet = {
    text: "",
    account: "Kanye"
}

kanye_json_data = []

// Turns array of tweets into an array of JSON objects - DOESN'T WORK
function textToJSON(text) {
    /* var isArr = kanye_tweets instanceof Array;
    console.log(isArr); */
    console.log(kanye_tweets); 
    kanye_tweets.forEach(tweet_text => {
        t = new kanye_tweet;
        t.text = tweet_text;
        kanye_json_data.push(t);
    });
}

textToJSON(kanye_tweets);

console.log(kanye_json_data);

/* const trainingData = data.map(item => ({
    input: item.text,
    output: item.category
}));

network.train(trainingData, {
    iterations: 100
});

const output = network.run("Hard drive power");

console.log(`Category: ${output}`); */