
'use strict';

var AgolLayersFinder = require('../../../client/scripts/api/agolLayersFinder.jsx');

describe('Routes for router', function() {

  it('It should reaturn some results', function() {
    // Expect it to exist
   	 expect(AgolLayersFinder.findLayers).to.be.ok;
  });

});
