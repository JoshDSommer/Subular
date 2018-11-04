import { TestBed, inject } from '@angular/core/testing';

import { ContextMenuComponent } from './context-menu.component';

describe('a context-menu component', () => {
	let component: ContextMenuComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContextMenuComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ContextMenuComponent], (ContextMenuComponent) => {
		component = ContextMenuComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});