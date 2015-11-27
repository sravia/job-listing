'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    title: {
        type: String,
        index: true
    }
});

mongoose.model('Category', CategorySchema);