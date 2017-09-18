import { TestBed, inject } from '@angular/core/testing';

import { SubularBrandComponent } from './subular-brand.component';

describe('a subular-brand component', () => {
	let component: SubularBrandComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SubularBrandComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SubularBrandComponent], (SubularBrandComponent) => {
		component = SubularBrandComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});