// /// <reference path="../../../typings/index.d.ts" />
// import * as _ from 'lodash';

// import { REDUCERS_DICTONARY, artists, ARTIST_ACTIONS  } from './reducers.index';
// import { addProviders, inject } from '@angular/core/testing';
// import { IArtist } from '../shared/models';

// describe('Artists Reducer', () => {
// 	let intialState: IArtist[];

// 	beforeEach(() => {
// 		intialState = <any>[{
// 			id: 1,
// 			name: 'mockArtist1'
// 		},
// 		{
// 			id: 2,
// 			name: 'mockArtist2'
// 		}];
// 	});
// 	it('should add a new artist to the store', () => {
// 		let mockArtist:IArtist = <any>{
// 			id: 1,
// 			name: 'mockArtist'
// 		};

// 		let result = artists(intialState, { type: ARTIST_ACTIONS.ADD_ARTISTS, payload: [mockArtist] });
// 		expect(result).toBeTruthy;
// 		expect(result).toContain(mockArtist);
// 	});
// 	it('should get all the artists', () => {
// 		let result = artists(intialState, { type: ARTIST_ACTIONS.GET_ARTISTS, payload: null });
// 		expect(result).toBeTruthy;
// 		expect(result).toBeTruthy();
// 	});
// });