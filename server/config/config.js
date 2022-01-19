require('dotenv').config();
module.exports = {
  development: {
    database: 'snowbook_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    database: 'snowbook_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    database: 'snowbook_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
};
