'use strict';

var api = require('./controllers/api'),
index = require('./controllers'),
users = require('./controllers/users'),
partidas = require('./controllers/partidas'),
times = require('./controllers/times'),
palpites = require('./controllers/palpite'),
ranking = require('./controllers/ranking'),
session = require('./controllers/session'),
middleware = require('./middleware');

/**
 * Application routes
 */
 module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
  .get(api.awesomeThings);
  
  app.route('/api/times')
  .post(times.create)
  .get(times.getAll);

  app.route('/api/palpites')
  .put(palpites.create)
  .post(palpites.create);
  
  app.route('/api/palpites/user/:id')
  .get(palpites.getByUser);

  app.route('/api/partidas')
  .post(partidas.create)
  .get(partidas.getAll);

  app.route('/api/partidas/resultados')
    .post(partidas.salvarResultados);

  app.route('/api/ranking')
    .put(ranking.calcularRanking)
    .get(ranking.get);

  app.route('/api/ranking/user/:userId/quesito/:quesito/page/:page')
   .get(ranking.partidasRanking);

  app.route('/api/users')
  .post(users.create)
  .put(users.changePassword)
  .get(users.getAll);

  app.route('/api/users/me')
  .get(users.me);
  app.route('/api/users/:id')
  .get(users.show);

  app.route('/api/session')
  .post(session.login)
  .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
  .get(function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
  .get(index.partials);
  app.route('/*')
  .get( middleware.setUserCookie, index.index);
};