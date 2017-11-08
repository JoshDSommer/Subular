import { TestBed, inject } from '@angular/core/testing';

import { AlbumCardComponent } from './album-card.component';
import { SubsonicService, SubsonicAuthenticationService } from '../../../subular-shared/index';

describe('a album-card component', () => {
	let component: AlbumCardComponent;

	// register all needed dependencies
	// beforeEach(() => {
	// 	TestBed.configureTestingModule({
	// 		providers: [
	// 			AlbumCardComponent,
	// 			SubsonicService,
	// 			SubsonicAuthenticationService
	// 		]
	// 	});
	// });

	// // instantiation through framework injection
	// beforeEach(inject([AlbumCardComponent], (AlbumCardComponent) => {
	// 	component = AlbumCardComponent;
	// }));

	// it('should have an instance', () => {
	// 	expect(component).toBeDefined();
	// });
});