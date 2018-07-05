import { TestBed, inject } from '@angular/core/testing';

import { SupaComponent } from './supa.component';

describe('a supa component', () => {
	let component: SupaComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SupaComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SupaComponent], (SupaComponent) => {
		component = SupaComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});