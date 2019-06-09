import { async, TestBed } from '@angular/core/testing';
import { WebLoginModule } from './web-login.module';

describe('WebLoginModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebLoginModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebLoginModule).toBeDefined();
  });
});
