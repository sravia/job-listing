'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    jobId: {
        type: String
    },
    date: {
        type: Date
    },
    applicationName: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    }
});

mongoose.model('Application', ApplicationSchema);