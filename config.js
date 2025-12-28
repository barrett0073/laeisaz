const config = {
  production: {
    port: 443,
    host: '193.151.150.10',
    env: 'production'
  },
  development: {
    port: 80,
    host: 'localhost',
    env: 'development'
  }
};

const env = process.env.NODE_ENV || 'development';
const defaults = config[env];

module.exports = {
  ...defaults,
  port: process.env.PORT ? Number(process.env.PORT) : defaults.port,
  host: process.env.HOST || defaults.host
};