const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  port: 8080,
  uploadPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/social',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
};