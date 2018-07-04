import { TestBed, inject } from '@angular/core/testing';

import { RecentlyAddedComponent } from './recently-added.component';

describe('a recently-added component', () => {
	let component: RecentlyAddedComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RecentlyAddedComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RecentlyAddedComponent], (RecentlyAddedComponent) => {
		component = RecentlyAddedComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});