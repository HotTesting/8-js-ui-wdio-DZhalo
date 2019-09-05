const assert = require('assert');

describe("Search results sorting", function() {
    it("correctly arranges items when using 'by price' sorting", function() {
      browser.url('')
      const searchInput = $('input[type="search"]')
      searchInput.setValue("duck")
      browser.keys("\uE007")
      searchResultsPage = $('div[id="box-search-results"]')
      sortByPriceLink = searchResultsPage.$('=Price')
      sortByPriceLink.click()
      browser.pause(3000)

      const searchResultPrices = searchResultsPage.$$('.product')


      
    });
  
    it("correctly arranges items when using 'by name' sorting", function() {
        browser.url('')
        const searchInput = $('input[type="search"]')
        searchInput.setValue("duck")
        browser.keys("\uE007")
        searchResultsPage = $('div[id="box-search-results"]')
        sortByNameLink = searchResultsPage.$('=Name')
        sortByNameLink.click()
        browser.pause(3000)

        const searchResultNames = searchResultsPage.$$('.name')

        let prevValue = null;
 
        for(let i =0; i < searchResultNames.length; i++){
            if(prevValue !== null){
                assert(prevValue < searchResultNames[i].getText() ,'Name sorting is wrong');
                prevValue = searchResultNames[i].getText();
            } else{
                prevValue = searchResultNames[i].getText();
            }
        }

    });
  });