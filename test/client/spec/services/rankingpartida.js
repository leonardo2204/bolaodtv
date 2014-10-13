'use strict';

describe('Service: Rankingpartida', function () {

  // load the service's module
  beforeEach(module('bolaoDtvApp'));

  // instantiate service
  var Rankingpartida;
  beforeEach(inject(function (_Rankingpartida_) {
    Rankingpartida = _Rankingpartida_;
  }));

  it('should do something', function () {
    expect(!!Rankingpartida).toBe(true);
  });

});
