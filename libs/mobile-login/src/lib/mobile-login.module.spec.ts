import { async, TestBed } from '@angular/core/testing';
import { MobileLoginModule } from './mobile-login.module';

describe('MobileLoginModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MobileLoginModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MobileLoginModule).toBeDefined();
  });
});
