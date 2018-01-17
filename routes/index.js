var express = require('express');
var router = express.Router();

/**********
 * ROUTES *
 **********/

/* GET home page. */
router.get('/', function homepage (req, res, next) {
  res.render('index', { title: 'Lawn Tracker' });
});

/* JSON API Endpoints */

router.get('/api', function api_index (req, res){
  res.json({
    message: "Lawn Tracker App for Lawnsworth",
    documentation_url: "https://github.com/njang/lawnTracker/blob/master/README.md",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

module.exports = router;