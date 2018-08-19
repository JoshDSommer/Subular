import { TestBed, inject } from '@angular/core/testing';

import { BackLinkComponent } from './back-link.component';

describe('a back-link component', () => {
	let component: BackLinkComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BackLinkComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BackLinkComponent], (BackLinkComponent) => {
		component = BackLinkComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});