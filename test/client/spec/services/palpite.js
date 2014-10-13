'use strict';

describe('Service: Palpite', function () {

  // load the service's module
  beforeEach(module('bolaoDtvApp'));

  // instantiate service
  var Palpite;
  beforeEach(inject(function (_Palpite_) {
    Palpite = _Palpite_;
  }));

  it('should do something', function () {
    expect(!!Palpite).toBe(true);
  });

});
