'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('view', function() {

    beforeEach(function() {
      browser.get('index.html#!/view');
    });


    it('should render view when user navigates to /view', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Numbers UI/);
    });

  });

});
