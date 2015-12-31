'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var JobSchema = new Schema({
    user: {
        type: String
    },
    categoryId: {
        type: String
    },
    company: {
        type: String
    },
    profession: {
        type: String
    },
    workTimeId: {
        type: Number
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    date: {
        type: Date
    },
    expireDaysId: {
        type: Number
    }
});

mongoose.model('Job', JobSchema);