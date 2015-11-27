'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var JobSchema = new Schema({
  title: {
    type: String,
    index: true
  }
});

mongoose.model('Job', JobSchema);