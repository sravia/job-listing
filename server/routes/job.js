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
    newJob.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(newJob);
        }
    });
});

router.route('/jobs/:jobId').put(function(req, res) {
    var job = req.job;
    job.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(job);
        }
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
router.route('/jobs/:start/:end/:keywords/:location/:professions/:worktime').get(function(req, res) {
    var keywords = req.params.keywords == "null" ? "" : req.params.keywords;
    var location = req.params.location == "null" ? "" : req.params.location;
    var professions = req.params.professions == "null" ? { $ne: "null"} : { $in : req.params.professions.split(',')  };
    var worktime = req.params.worktime == "null" ? { $ne: "null"} : { $in : req.params.worktime.split(',')  };
    Job.find({ 'profession': new RegExp(keywords, 'i'),
        'location' : new RegExp(location, 'i'),
        'categoryId' : professions,
        'worktime' : worktime  })
        .sort('-created')
        .skip(req.params.start)
        .limit(req.params.end)
        .exec(function(err, jobs) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(jobs);
        }
    });
});

// TODO - Refactor this disaster - expressjs multiple optional parameters not allowed?
router.route('/jobs/count/:keywords/:location/:professions/:worktime').get(function(req, res) {
    var keywords = req.params.keywords == "null" ? "" : req.params.keywords;
    var location = req.params.location == "null" ? "" : req.params.location;
    var professions = req.params.professions == "null" ? { $ne: "null"} : { $in : req.params.professions.split(',')  };
    var worktime = req.params.worktime == "null" ? { $ne: "null"} : { $in : req.params.worktime.split(',')  };
    Job.find({ 'profession': new RegExp(keywords, 'i'),
        'location' : new RegExp(location, 'i'),
        'categoryId' : professions,
        'worktime' : worktime  })
        .count(function(err, count) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(count);
            }
        });
});

router.route('/jobs/count/:creator').get(function(req, res) {
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
    console.log(req.params.creator);

    console.log(req.params.start);
    console.log(req.params.end);

    Job.find({ 'user': req.params.creator})
        .sort('-created')
        .skip(req.params.start)
        .limit(req.params.end)
        .exec(function(err, jobs) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(jobs);
            }
        });
});


router.route('/upload').post(function(req, res) {
    var file = req.files.file;
    res.jsonp({
        imgName: file.name
    });
});

module.exports = router;