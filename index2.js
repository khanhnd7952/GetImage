const https = require('https');
const fs = require('fs');

const url = 'https://mrcong.com/pure-media-vol-235-sou-gradoll-81-photos';

const request = require('request');
const cheerio = require('cheerio');

request(url, (error, response, body) => {
    console.log(response.statusMessage);

  });