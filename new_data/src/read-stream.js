var Twitter = require('twitter');
var Kafka = require('no-kafka');
var producer = new Kafka.Producer({'connectionString': 'kafka:9092'});

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

console.log('TWITTER_CONSUMER_KEY', process.env.TWITTER_CONSUMER_KEY);
console.log('TWITTER_CONSUMER_SECRET', process.env.TWITTER_CONSUMER_SECRET);
console.log('TWITTER_ACCESS_TOKEN_KEY', process.env.TWITTER_ACCESS_TOKEN_KEY);
console.log('TWITTER_ACCESS_TOKEN_SECRET', process.env.TWITTER_ACCESS_TOKEN_SECRET);

client.stream('statuses/filter', {track: 'javascript'}, function (stream) {
  stream.on('data', function (tweet) {
    console.log(tweet.text);
    producer.init().then(function () {
      return producer.send({
        topic: 'tweet',
        partition: 0,
        message: {
          text: tweet.text
        }
      });
    }).then(function (result) {
      console.log('Kafka result', result);
      /*
       [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
       */
    });
  });

  stream.on('error', function (error) {
    throw error;
  });
});
