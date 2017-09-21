import { TestBed, inject } from '@angular/core/testing';

import { PlayerComponent } from './player.component';

describe('a player component', () => {
	let component: PlayerComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PlayerComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([PlayerComponent], (PlayerComponent) => {
		component = PlayerComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});