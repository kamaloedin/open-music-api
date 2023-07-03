const AuthenticationsHandlers = require('./handlers');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { authenticationsService, usersService, tokenManager, validator }) => {
    const authenticationsHandler = new AuthenticationsHandlers(
      authenticationsService,
      usersService,
      tokenManager,
      validator,
    );

    server.route(routes(authenticationsHandler));
  },
};
