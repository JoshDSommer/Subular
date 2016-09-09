import { TestBed, inject } from '@angular/core/testing';

import { SongListComponent } from './songList.component';

describe('a songList component', () => {
	let component: SongListComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SongListComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SongListComponent], (SongListComponent) => {
		component = SongListComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});