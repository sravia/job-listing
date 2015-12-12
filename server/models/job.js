'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var JobSchema = new Schema({
  title: {
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
    worktime: {
        type: String
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
    expireDate: {
        type: Date
    }
});

mongoose.model('Job', JobSchema);