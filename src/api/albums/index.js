const AlbumsHandlers = require('./handlers');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumsService, songsService, storageService, validator }) => {
    const albumsHandler = new AlbumsHandlers(
      albumsService,
      songsService,
      storageService,
      validator,
    );
    server.route(routes(albumsHandler));
  },
};
