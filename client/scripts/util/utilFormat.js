'use strict';

module.exports = {	
	
	formatWithThousandsSeparator: function(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
};

