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
    name: {
        type: String
    },
    email: {
        type: String
    },
    cv: {
        type: String
    }
});

mongoose.model('Application', ApplicationSchema);