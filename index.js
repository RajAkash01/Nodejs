const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const { mongourl } = require('./keys');

const arr = [];
require('./models/User');
require('./models/TokenData');
require('./models/Leads');
const Token = mongoose.model('TokenData');
const Lead = mongoose.model('LeadData');
const authRoutes = require('./routes/authRoutes');
app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect(mongourl);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongoose');
});
mongoose.connection.on('error', (error) => {
  console.log('Error', error);
});

const GetData = async () => {
  let T = [];
  await Token.find().then((res) => res.map((it) => T.push(it.Token)));
  const result = await fetch(
    'https://www.zohoapis.in/crm/v3/Leads?fields=Last_Name,Email',
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${T[0]}`,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      arr.push(json);
      // const lead = new Lead({ Lead: 'json' });
      // lead.save();
    });
};
GetData();

app.get('/', (req, res) => {
  console.log(req.body);
  // res.send('hello');
  res.send(arr);
});

app.listen(PORT, () => {
  console.log('server running ' + PORT);
});
