var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose'),
    Application = mongoose.model('Application');

router.route('/upload').post(function(req, res) {
    var file = req.files.file;
    res.jsonp({
        fileName: file.name
    });
});

module.exports = router;