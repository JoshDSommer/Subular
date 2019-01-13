import { TestBed, inject } from '@angular/core/testing';

import { ArtistListComponent } from './artist-list.component';

describe('a artist-list component', () => {
  let component: ArtistListComponent;

  // register all needed dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistListComponent]
    });
  });

  // instantiation through framework injection
  beforeEach(inject([ArtistListComponent], ArtistListComponent => {
    component = ArtistListComponent;
  }));

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });
});
