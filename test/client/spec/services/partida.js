'use strict';

describe('Service: Partida', function () {

  // load the service's module
  beforeEach(module('bolaoDtvApp'));

  // instantiate service
  var Partida;
  beforeEach(inject(function (_Partida_) {
    Partida = _Partida_;
  }));

  it('should do something', function () {
    expect(!!Partida).toBe(true);
  });

});
