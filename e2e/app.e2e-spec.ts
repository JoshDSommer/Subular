import { SubularPage } from './app.po';

describe('subular App', function() {
  let page: SubularPage;

  beforeEach(() => {
    page = new SubularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
