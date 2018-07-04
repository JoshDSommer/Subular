import { TestBed, inject } from '@angular/core/testing';

import { PlaylistListComponent } from './playlist-list.component';

describe('a playlist-list component', () => {
	let component: PlaylistListComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PlaylistListComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([PlaylistListComponent], (PlaylistListComponent) => {
		component = PlaylistListComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});