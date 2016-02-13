var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose'),
    Job = mongoose.model('Job');

router.param('jobId', function(req, res, next, id) {
    Job.findOne({_id: id}, function(error, job) {
        if (error) return next(error);
        if (!job) return next(new Error('Failed to load job ' + id));
        req.job = job;
        next();
    });
});

router.route('/jobs').post(function(req, res) {
    var newJob = new Job(req.body);
    console.log(req.body);

    newJob.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(newJob);
        }
    });
});

router.route('/jobs/:jobId').put(function(req, res) {
    var categoryId = req.body.categoryId;
    var company = req.body.company;
    var date = req.body.date;
    var description = req.body.description;
    var expireDaysId = req.body.expireDaysId;
    var image = req.body.image;
    var location = req.body.location;
    var profession = req.body.profession;
    var user = req.body.user;
    var workTimeId = req.body.workTimeId;

    Job.findById(req.params.jobId, function (err, job) {
        job.update({
            categoryId : categoryId,
            company : company,
            date : date,
            description : description,
            expireDaysId : expireDaysId,
            image : image,
            location : location,
            profession : profession,
            user : user,
            workTimeId : workTimeId
        }, function (err) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(job);
            }
        })
    });
});

router.route('/jobs/:jobId').delete(function(req, res) {
    var job = req.job;
    job.remove(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(job);
        }
    });
});

router.route('/jobs/:jobId').get(function(req, res) {
    res.json(req.job);
});

router.route('/jobs').get(function(req, res) {
    Job.find().sort('-created').exec(function(err, jobs) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(jobs);
        }
    });
});

// TODO - Refactor this disaster - expressjs multiple optional parameters not allowed?
router.route('/jobs/:start/:end/:keywords/:location/:professions/:workTimeId').get(function(req, res) {
    var keywords = req.params.keywords == "null" ? "" : req.params.keywords;
    var location = req.params.location == "null" ? "" : req.params.location;
    var professions = req.params.professions == "null" ? { $ne: "null"} : { $in : req.params.professions.split(',')  };
    var workTimeId = req.params.workTimeId == "null" ? { $ne: "-1"} : { $in : req.params.workTimeId.split(',')  };
    Job.find({ 'profession': new RegExp(keywords, 'i'),
        'location' : new RegExp(location, 'i'),
        'categoryId' : professions,
        'workTimeId' : workTimeId  })
        .sort('-created')
        .skip(Number(req.params.start))
        .limit(Number(req.params.end))
        .exec(function(err, jobs) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(jobs);
        }
    });
});

// TODO - Refactor this disaster - expressjs multiple optional parameters not allowed?
router.route('/jobs/count/:keywords/:location/:professions/:workTimeId').get(function(req, res) {
    var keywords = req.params.keywords == "null" ? "" : req.params.keywords;
    var location = req.params.location == "null" ? "" : req.params.location;
    var professions = req.params.professions == "null" ? { $ne: "null"} : { $in : req.params.professions.split(',')  };
    var workTimeId = req.params.workTimeId == "null" ? { $ne: "-1"} : { $in : req.params.workTimeId.split(',')  };
    Job.find({ 'profession': new RegExp(keywords, 'i'),
        'location' : new RegExp(location, 'i'),
        'categoryId' : professions,
        'workTimeId' : workTimeId  })
        .count(function(err, count) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(count);
            }
        });
});

router.route('/jobs/count/:creator').get(function(req, res) {
    console.log(req.params.creator);
    Job.find({ 'user': req.params.creator })
        .count(function(err, count) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(count);
            }
        });
});

router.route('/jobs/:start/:end/:creator').get(function(req, res) {
    Job.find({ 'user': req.params.creator})
        .sort('-created')
        .skip(Number(req.params.start))
        .limit(Number(req.params.end))
        .exec(function(err, jobs) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(jobs);
            }
        });
});

module.exports = router;