import { TestBed, inject } from '@angular/core/testing';

import { RandomAlbumsComponent } from './random-albums.component';

describe('a random-albums component', () => {
	let component: RandomAlbumsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RandomAlbumsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RandomAlbumsComponent], (RandomAlbumsComponent) => {
		component = RandomAlbumsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});