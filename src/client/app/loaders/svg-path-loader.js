/*
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @author  Aleksi Ahtiainen <aleksi dot ahtiainen at iki dot fi>
 */

module.exports = function(content) {
    this.cacheable();

    var callback = this.async();

    var parseString = require('xml2js').parseString;

    parseString(content, {async: true}, function (err, result) {

        if (!err) {
            const data = 'module.exports = "' + result.svg.path[0]['$'].d + '";';
            callback(null, data);
        } else {
            return callback(err);
        }
    });

};
