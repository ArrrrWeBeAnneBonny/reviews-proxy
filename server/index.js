const express = require('express');
const app = express();
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');

app.use(morgan('dev'));

const port = 3000;
const host = 'localhost';
let reviewsServer = 'http://localhost:3001';

app.use('/reviews', createProxyMiddleware({
  target: reviewsServer,
  changeOrigin: true,
  pathRewrite: {
    [`^/localhost:3001`]: '',
  }
}))

app.listen(port, (err) => {
  if (err) {
    console.log('error connecting to reviews proxy', err);
  } else {
    console.log(`connected to reviews proxy on ${port}`);
  }
});

//curl http://localhost:3001/reviews?campId=0
