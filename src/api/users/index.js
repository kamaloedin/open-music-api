const UsersHandlers = require('./handlers');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const usersHandlers = new UsersHandlers(service, validator);
    server.route(routes(usersHandlers));
  },
};
