const ExportsHandlers = require('./handlers');
const routes = require('./routes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { service, playlistsService, validator }) => {
    const exportsHandler = new ExportsHandlers(service, playlistsService, validator);
    server.route(routes(exportsHandler));
  },
};
