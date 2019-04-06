// {"token_type":"bearer","access_token":"AAAAAAAAAAAAAAAAAAAAAIb19gAAAAAAY1ozuEmN%2BPqdpA5rXm%2FwG2Qf4Cg%3Dv2aixiExWlsKL3wE4SF9m52um6ovUXVWdQe7aZYDwFqPFmiB9I"}⏎
const brain = require("brain.js");
const request = require("request");
const network = new brain.recurrent.LSTM();

const kanyeOptions = {
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kanyewest&count=20',
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAIb19gAAAAAAY1ozuEmN%2BPqdpA5rXm%2FwG2Qf4Cg%3Dv2aixiExWlsKL3wE4SF9m52um6ovUXVWdQe7aZYDwFqPFmiB9I'
    }
};

const trumpOptions = {
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=20',
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAIb19gAAAAAAY1ozuEmN%2BPqdpA5rXm%2FwG2Qf4Cg%3Dv2aixiExWlsKL3wE4SF9m52um6ovUXVWdQe7aZYDwFqPFmiB9I'
    }
};

var info = [];
tweet_json_data = []

function Tweet(text, account) {
    this.text = text;
    this.account = account;
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        info.forEach(tweet => {
            let t = new Tweet(tweet.text, tweet.user.name);
            tweet_json_data.push(t);
        });
        console.log("---------------")
        console.dir(tweet_json_data);
    }
}

makeRequests( function() {
    setTimeout( function() {
        runNeuralNet(populateTrainingData(tweet_json_data));
    }, 10000);
});


// Turns array of tweets into an array of JSON objects - DOESN'T WORK
/* function textToJSON(text) {
    tweets.forEach(tweet_text => {
        let t = new Tweet(tweet_text);
        tweet_json_data.push(t);
    });
} */

function makeRequests(net) {
    request(kanyeOptions, callback);
    request(trumpOptions, callback);
    net();
}

function populateTrainingData(data) {
    const trainingData = data.map(item => ({
        input: item.text,
        output: item.account
    }));
    console.log("-----------------")
    console.log(trainingData);
    return trainingData;
}

function runNeuralNet(trainingData) {
    network.train(trainingData, {
        iterations: 100
    });
    const output = network.run("artist kanye drake love");
    console.log(`Account: ${output}`);
}