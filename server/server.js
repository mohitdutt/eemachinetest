const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = 3000;
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
// Connect to MongoDB
mongoose.connect('mongodb+srv://mohitdutt:EbSyZwt7vLAk_DJ@clusterwarneem.9swzutp.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for your data
const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
        },
    type: {
        type: String,
        required: true
        },
    price: {
        type: Number,
        required: true
        }
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API endpoint to save data
app.post('/api/saveData', (req, res) => {
  const { title, description, date, startTime, endTime, type, price } = req.body.body;
  // Create a new data object
  const newData = new Data({
    title,
    description, 
    date, 
    startTime, 
    endTime, 
    type, 
    price
  });

  // Save the data to MongoDB
  newData.save()
    .then(() => {
      res.status(200).json({ message: 'Data saved successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// API endpoint to get data
app.get('/api/getData', (req, res) => {
    // Create a new data object
  
    // Save the data to MongoDB
    Data.find()
      .then((data) => {
        res.status(200).json({ data:data, message: 'Data fetched successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
});

app.get('/api/getDataById/:id', (req, res) => {
    console.log(req.params.id)
    // Create a new data object
  
    // Save the data to MongoDB
    Data.findById(req.params.id)
      .then((data) => {
        console.log(data)
        res.status(200).json({ data:data, message: 'Data fetched successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



// https://cloud.mongodb.com/v2/649d0cc9d0dfd22957d37c10#/metrics/replicaSet/649d0d8a5034a84e4e974851/explorer/test/datas/find