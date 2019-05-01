require('newrelic');
const express = require('express');
const app = (express());
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db/index');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.use(cors());

app.use('/carousel/:id', express.static(__dirname + '/../client/dist'));

app.get('/loaderio-d4c8c0eecb993340555d613189834bf0', (req, res) => {
  const filePath = path.join(__dirname, '../../loaderio-d4c8c0eecb993340555d613189834bf0.txt');
  res.sendFile(filePath);
});

app.get('/videos/:id', (req, res) => {
  const {id} = req.params;
  db.getVideos(id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var result = {
        id: id,
        name: results.rows[0].name,
        associatedVideos: []
      };
      for (var i = 0; i < results.rows.length; i++) {
        result.associatedVideos[i] = {title: results.rows[i].name, url: results.rows[i].url}
      }
      res.status(200).json([result]);
    }
  });
});


app.post('/videos/add', (req, res) => {
  let {name, url} = req.body;
  db.createVideo(name, url, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(201).json("OK");
    }
  });
});



app.put('/videos/update', (req, res) => {
  const {name, url, id} = req.body;
  db.updateVideo(name, url, id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

app.delete('/videos/delete', (req, res) => {
  const {id, associatedId} = req.body;
  db.deleteAssociation(id, associatedId, (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server active! Listening on port ${PORT}.`)
});