const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const arr = [];

const port = 8080;

app.get('/result', async (req, res)=>{

     const options = {
      method: 'GET',
      url: 'https://airbnb13.p.rapidapi.com/search-location',
      params: {
        location: arr[0].location,
        checkin: arr[0].checkin,
        checkout: arr[0].checkout,
        adults: arr[0].adults,
        children: arr[0].children,
        infants: arr[0].infants,
        pets: arr[0].pets,
        page: '1',
        currency: arr[0].currency
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'df42353599msh361b92f040feb22p14ce90jsnc92449ae7081',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    };

    try {
          const response =  await axios.request(options);

          res.send(response.data);
        } catch (error) {
          console.error(error);
        }


})

app.post('/', async (req, res)=>{
    const data = req.body.values;

    arr[0] = data;

})

app.get('/', async (req, res)=>{
  const options = {
    method: 'GET',
    url: 'https://currency-converter219.p.rapidapi.com/currencies',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': 'a4ba6b38f3mshfb840721b5f4233p17b123jsn8688ad109155',
      'X-RapidAPI-Host': 'currency-converter219.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    res.send(response.data)
  } catch (error) {
    console.error(error);
  }
})




app.listen(port, ()=>{
    console.log("Server is running on port "+port);
})