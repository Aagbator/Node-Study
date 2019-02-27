const path = require('path');

// gives us access to the file this module or our application is running
module.exports = path.dirname(process.mainModule.filename);