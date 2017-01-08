import express from 'express';

import {MongoClient} from 'mongodb';

import assert from 'assert';

const mongoUrl = 'mongodb://localhost:27017/bg-map';

const app = express();

app.use('/', express.static('src/client'));
app.use('/material-design-icons/', express.static('node_modules/material-design-icons'));

MongoClient.connect(mongoUrl, (err, db) => {
    assert.equal(null, err);

    console.log('Connected to Mongo server');

    // TODO: Cleaner setup of paths, using express Router or something
    app.get('/api/regular-groups', (req, res) => {
        db.collection('regular-groups').find().toArray((err, result) => {
            if (err) return console.log(err);

            res.json(result);
        });
    });

    app.listen(process.env.PORT || 3000);
});
