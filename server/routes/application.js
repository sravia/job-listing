var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose'),
    Application = mongoose.model('Application');


router.param('applicationId', function(req, res, next, id) {
    Application.findOne({_id: id}, function(error, application) {
        if (error) return next(error);
        if (!application) return next(new Error('Failed to load application ' + id));
        req.application = application;
        next();
    });
});

router.route('/').post(function(req, res) {
    var application = new Application(req.body);
    application.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(application);
        }
    });
});

router.route('/:applicationId').delete(function(req, res) {
    var application = req.application;

    application.remove(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(application);
        }
    });
});

router.route('/:applicationId').get(function(req, res) {
    res.json(req.application);
});

router.route('/').get(function(req, res) {
    Application.find().sort('-created').exec(function(err, applications) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(applications);
        }
    });
});


module.exports = router;