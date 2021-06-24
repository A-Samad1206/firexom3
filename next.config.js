const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['#components'] = path.join(__dirname, 'components');
    config.resolve.alias['#firebase'] = path.join(__dirname, 'firebase');
    config.resolve.alias['#Ctx'] = path.join(__dirname, 'ContextAPI');
    config.resolve.alias['#UI'] = path.join(__dirname, 'components/UI');
    config.resolve.alias['#LIB'] = path.join(__dirname, 'lib');
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
