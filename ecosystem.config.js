module.exports = {
  apps: [{
    name: 'strapi-backend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/backend',
    env: {
      HOST: '0.0.0.0',
      PORT: 1337,
      NODE_ENV: 'production'
    }
  }]
};