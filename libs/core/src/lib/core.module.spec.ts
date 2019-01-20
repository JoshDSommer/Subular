import { async, TestBed } from '@angular/core/testing';
import { SubularCoreModule } from './core.module';

describe('CoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SubularCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SubularCoreModule).toBeDefined();
  });
});
