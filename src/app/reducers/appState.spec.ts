// /// <reference path="../../../typings/index.d.ts" />

// import { REDUCERS_DICTONARY, appState, AppState, APP_STATE_ACTIONS   } from './reducers.index';
// import { addProviders, inject } from '@angular/core/testing';

// describe('Artists Reducer', () => {
// 	let intialState: AppState;

// 	beforeEach(() => {
// 		intialState = AppState.loading;
// 	});
// 	it('should return state loading', () => {
// 		let result = appState(intialState, { type: APP_STATE_ACTIONS.LOADING });
// 		expect(result).toBe(AppState.loading);
// 	});
// 	it('should change state to paused', () => {
// 		let result = appState(intialState, { type: APP_STATE_ACTIONS.PAUSED });
// 		expect(result).toBe(AppState.paused);
// 	});
// 	it('should change state to playing', () => {
// 		let result = appState(intialState, { type: APP_STATE_ACTIONS.PLAYING });
// 		expect(result).toBe(AppState.playing);
// 	});
// });