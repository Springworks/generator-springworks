# <%= _.slugify(appname) %>
<% if (!privateProject) { %>
[![Build Status](https://travis-ci.org/Springworks/<%= _.slugify(appname) %>.png?branch=master)](https://travis-ci.org/Springworks/<%= _.slugify(appname) %>)
[![Coverage Status](https://coveralls.io/repos/Springworks/<%= _.slugify(appname) %>/badge.png?branch=master)](https://coveralls.io/r/Springworks/<%= _.slugify(appname) %>?branch=master)

## License

MIT
<% } %>
