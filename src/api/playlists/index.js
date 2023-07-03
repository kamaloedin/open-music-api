const PlaylistsHandlers = require('./handlers');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlistsService, songsService, validator }) => {
    const playlistsHandlers = new PlaylistsHandlers(playlistsService, songsService, validator);
    server.route(routes(playlistsHandlers));
  },
};
