const express = require('express');
const app = express();
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');

console.log(__dirname + '/../client');
app.use(cors());
app.use(express.static(__dirname + '/../client'));


const PORT = 3000;
const host = 'localhost';
let reviewsServer = 'http://ec2-54-193-152-3.us-west-1.compute.amazonaws.com';

app.use('/reviews', createProxyMiddleware({
  target: reviewsServer,
  changeOrigin: true,
  // pathRewrite: {
  //   [`^/localhost:3001`]: '',
  // }
}))


app.listen(PORT, (err) => {
  if (err) {
    console.log('error connecting to reviews proxy', err);
  } else {
    console.log(`connected to reviews proxy on ${PORT}`);
  }
});

//curl http://localhost:3001/reviews?campId=0
