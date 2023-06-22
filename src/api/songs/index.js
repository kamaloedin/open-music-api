const SongsHandlers = require('./handlers');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandlers = new SongsHandlers(service, validator);
    server.route(routes(songsHandlers));
  },
};
