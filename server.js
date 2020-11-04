const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/1.0/identifiers/*', cors(), (req, res, next) => {
  let xx = {}
  const url = req.url
  const regex = /\/1.0\/identifiers\/(did:.*)/
  const did = regex.exec(url)[1]
  const resolver_url = ''.concat
('http://did_resolver.muzamint.com:1317/did/identifier/',did )
  fetch
  (resolver_url)
  .then(res => {
    if (res.ok) {
      return res.json({msg: 'This is CORS-enabled for only example.com.'})
    } else {
      return Promise.reject('something went wrong!')
    }
  })
  .then(data => { console.log('data is', data);
    console.log(data.result.diddoc)
    res.json({ "didDocument": JSON.parse(data.result.diddoc)})
  })
  .catch(error => console.log('error is', error));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
