const path = require('path');

// Variable that helps to construct path to a parent directory
// mainModule - refers to main module that started application
module.exports = path.dirname(require.main.filename);