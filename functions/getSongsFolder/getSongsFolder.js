/* eslint-disable */
const fetch = require('node-fetch')
var CryptoJS = require("crypto-js");

exports.handler = async function (event, context) {
  const token = event.queryStringParameters.token
  const clientId = event.queryStringParameters.clientId
  if (!token || !clientId) {
    return { statusCode: 400, body: 'bad request' }
  }

  const response = await fetch('https://api.twitch.tv/helix/users', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-ID': clientId,
    },
  });

  const json = await response.json()

  user = json.data[0];

  const encrypted = CryptoJS.HmacSHA1(user.id, process.env.SALT)
  const safeEncrypted = encrypted.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');

  return {
    statusCode: 200,
    body: JSON.stringify({ user: user, folder: encrypted.toString() })
  }
}
