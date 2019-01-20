import { TestBed, inject } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('a header component', () => {
	let component: HeaderComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				HeaderComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([HeaderComponent], (HeaderComponent) => {
		component = HeaderComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});