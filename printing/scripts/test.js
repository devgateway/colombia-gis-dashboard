
var page = require('webpage').create();
    

// Open Twitter Mobile and, onPageLoad, do...
page.open("https://www.google.com.ar/", function (status) {
    // Check for page load success
    console.log(status);

    if (status !== "success") {
        console.log("Unable to access network");
    } else {

        // Execute some DOM inspection within the page context
      var retval=  page.evaluate(function() {
            var list = document.querySelectorAll('#lst-ib').value='Daniel';
            			document.querySelectorAll('input').click()
          
        });

      console.log(retval);
    }
    phantom.exit();
})