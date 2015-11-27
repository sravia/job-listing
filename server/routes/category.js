var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

router.param('categoryId', function(req, res, next, id) {
    Category.findOne({_id: id}, function(error, category) {
        if (error) return next(error);
        if (!category) return next(new Error('Failed to load category ' + id));
        req.category = category;
        next();
    });
});

router.route('/category').post(function(req, res) {
    var category = new Category(req.body);
    category.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(category);
        }
    });
});

router.route('/category/:categoryId').put(function(req, res) {
    var category = req.category;
    category.title = req.body.title;
    category.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(category);
        }
    });
});

router.route('/category/:categoryId').delete(function(req, res) {
    var category = req.category;

    category.remove(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(category);
        }
    });
});

router.route('/category/:categoryId').get(function(req, res) {
    res.json(req.category);
});

router.route('/category').get(function(req, res) {
    Category.find().sort('-created').exec(function(err, categories) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(categories);
        }
    });
});

module.exports = router;