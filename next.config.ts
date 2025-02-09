module.exports = {
  webpack: (config:any, { isServer }:any) => {
    // Disable Turbopack for production and use Webpack instead
    if (!isServer) {
      config.resolve.alias['react-server-dom-turbopack/server.edge'] = false;
      config.resolve.alias['react-server-dom-webpack/server.edge'] = false;
    }
    return config;
  }
};
