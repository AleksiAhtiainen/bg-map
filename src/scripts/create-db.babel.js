import express from 'express';

import {MongoClient} from 'mongodb';

import assert from 'assert';

import data from './test-data.js';

const mongoUrl = 'mongodb://localhost:27017/bg-map';

function clearCollection(collectionName, db, callback) {
    const collection = db.collection(collectionName);

    collection.remove({}, {}, (err, result) => {
        if (!err)
        {
            console.log('Removed ' + result + ' documents from ' + collectionName);
        }

        callback();
    });
}

function insertDocuments(documents, collectionName, db, callback) {
    const collection = db.collection(collectionName);

    collection.insertMany(documents, (err, result) => {
        assert.equal(err, null);
        assert.equal(documents.length, result.result.n);
        assert.equal(documents.length, result.ops.length);

        console.log('Inserted ' + result.result.n + ' documents into the collection ' + collectionName);
        callback(result);
    });
}

MongoClient.connect(mongoUrl, (err, db) => {
    assert.equal(null, err);
    console.log('Connected to Mongo server');

    console.log('Creating test data', data);

    clearCollection('regular-groups', db, () => {
        insertDocuments(data.regularGroups, 'regular-groups', db, () => {
            clearCollection('events', db, () => {
                insertDocuments(data.events, 'events', db, () => {
                    db.close();
                })
            })
        });
    });
});
