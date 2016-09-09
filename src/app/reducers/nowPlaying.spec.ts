// /// <reference path="../../../typings/index.d.ts" />

// import { REDUCERS_DICTONARY, NOW_PLAYING_ACTIONS, nowPlaying   } from './reducers.index';
// import { addProviders, inject } from '@angular/core/testing';

// describe('Artists Reducer', () => {
// 	let intialState: {};

// 	beforeEach(() => {
// 		intialState = {
// 			nowPlayingTrack:{},
// 			nowPlayingQueue:[]
// 		};
// 	});
// 	it('should add a track to the queue', () => {
// 		let trackToAdd = <any>{
// 			title:'Track to Add'
// 		}
// 		let result = nowPlaying(intialState, { type: NOW_PLAYING_ACTIONS.QUEUE_TRACK, payload:trackToAdd });
// 		expect(true).toBe(false);
// 		expect(result).toContain(trackToAdd);
// 	});
// });