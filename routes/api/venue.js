var config = require('../../config/index');
var foursquare = require('node-foursquare')(config.get('foursquare'));
var dateFormat = require('dateformat');
var converter = require('../../libs/converter');

exports.get = function (req, res, next) {
    var now = new Date(),
        ll = req.params.ll.split(',');

    foursquare.Venues.explore(ll[0], ll[1], null, { venuePhotos : 1, v : dateFormat(now, "yyyymmdd")},
            req.params.token,
            function (error, data) {
            if (error) {
                return next(error);
            }

            res.json(data);
        });
};

exports.getByString = function (req, res, next) {
    var now = new Date(),
        ll = req.params.ll.split(',');

    foursquare.Venues.explore(ll[0], ll[1], null, { query : req.params.query, venuePhotos : 1,
            v : dateFormat(now, "yyyymmdd") },
            req.params.token,
            function (error, data) {
            if (error) {
                return next(error);
            }

            res.json(data);
        });
};

exports.getRestaurants = function (req, res, next) {
    var now = new Date(),
        ll = req.params.ll.split(',');

    foursquare.Venues.explore(ll[0], ll[1], null, {
            categoryId : '4d4b7105d754a06374d81259',
            specials : req.params.specials,
            v : dateFormat(now, "yyyymmdd")
        },
        req.params.token,
        function (error, data) {
            if (error) {
                return next(error);
            }
                res.json(converter.ConvertRestaurants(data));
        });
};