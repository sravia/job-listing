var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.route('/upload').post(function(req, res) {
    var file = req.files.file;
    console.log(file);
    res.jsonp({
        name: file.path.split("/")[2]
    });
});

module.exports = router;