'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /search when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/search");
  });


  describe('search', function() {

    beforeEach(function() {
      browser.get('index.html#!/search');
    });

    
    it('should render view when user navigates to /search', function() {
      expect(element.all(by.css('h1')).first().getText()).
        toMatch(/Walmart Product Search/);
    });

    it('should contain the search box where user navigates to /search', function() {
      var searchElement = element(by.css('#txtSearch'));
      expect(searchElement.isPresent()).toBeTruthy();
    });

  });

  describe('detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/detail/14871803');
    });


    it('should render view when user navigates to /detail', function() {
      expect(element.all(by.css('h1')).first().getText()).
      toMatch(/Walmart Product Search/);
    });

    it('should contain the details when user navigates /detail', function() {
      var cardElement = element.all(by.css('.card')).first();
      expect(cardElement.isPresent()).toBeTruthy();
    });

  });

});
