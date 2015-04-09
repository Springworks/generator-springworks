'use strict';


/**
 * Validates basic auth against ENV variables set on AWS Opsworks
 *
 * @param   {String}    username  The username
 * @param   {String}    password  The password
 * @param   {Function}  callback  called once done.
 */
exports.validate = function validate(username, password, callback) {
  var _user = process.env.NODE_BASIC_AUTH_USERNAME,
      _pass = process.env.NODE_BASIC_AUTH_PASSWORD;

  if (!_user || !_pass) {
    console.log(_user, _pass);
    callback(null, false);
    return;
  }

  if (username === _user && password === _pass) {
    callback(null, true, { id: 1, name: _user });
  }
  else {
    callback(null, false);
  }
};
