const CollaborationsHandlers = require('./handlers');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (
    server,
    { collaborationsService, playlistsService, usersService, validator },
  ) => {
    const collaborationsHandlers = new CollaborationsHandlers(
      collaborationsService,
      playlistsService,
      usersService,
      validator,
    );
    server.route(routes(collaborationsHandlers));
  },
};
