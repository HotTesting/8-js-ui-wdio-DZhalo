const assert = require('assert');

describe("Items search", function() {
    it("should show results in case multiple items matches", function() {
      browser.url('')
      const searchInput = $('input[type="search"]')
      searchInput.setValue("duck")
      browser.keys("\uE007")
      browser.pause(5000)
  
      const searchResultsPage = $('div[id="box-search-results"]')
      const searchResults = searchResultsPage.$$('.product')
      assert(searchResults.length > 1,'Search results page should have multiple items on it')
    })
  
    it("should redirect to item page in case only one result matches", function() {
      browser.url('')
      const searchInput = $('input[type="search"]')
      searchInput.setValue("purple")
      browser.keys("\uE007")
      browser.pause(5000)
      const productCharacteristics = $('.nav.nav-tabs')
      assert(productCharacteristics.isDisplayed(), 'One item page should have characteristic tabs')
    })
  
    it("should redirect to 'no matching results' in case no items matched", function() {
      browser.url('')
      const searchInput = $('input[type="search"]')
      searchInput.setValue("adracadabra")
      browser.keys("\uE007")
      browser.pause(5000)
      const searchResultsPage = $('div[id="box-search-results"]')
      const noSearchResultsText = searchResultsPage.getText()
      assert(noSearchResultsText.includes('No matching results'), 'Empty search results page should contain the relevant text')
    })


  })