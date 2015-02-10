/** @jsx React.DOM */
'use strict';

var React = require('react'),

    Mycomponent = React.createClass({
      render: function() {
        return (
          <h1 className="Mycomponent">
            <span className="glyphicon glyphicon-heart"> ReactJS</span>
          </h1>
        )
      }
    });

module.exports = Mycomponent;
