import { async, TestBed } from '@angular/core/testing';
import { SubsonicApiModule } from './subsonic-api.module';

describe('SubsonicApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SubsonicApiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SubsonicApiModule).toBeDefined();
  });
});
