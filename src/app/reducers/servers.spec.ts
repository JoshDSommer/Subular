/// <reference path="../../../typings/index.d.ts" />
import * as _ from 'lodash';

import { REDUCERS_DICTONARY, servers, SERVER_ACTIONS, IServer  } from './reducers.index';

describe('SettingsReducer', () => {
	let initialState;

	beforeEach(() => {
		initialState = [{
			serverAddress: 'Address',
			serverUserName: 'UName',
			serverPassword: 'PWord',
			selected: false,
			name: 'Server',
		},
			{
				serverAddress: 'Address1',
				serverUserName: 'UName1',
				serverPassword: 'PWord1',
				selected: false,
				name: 'Server1',
			},
			{
				serverAddress: 'Address2',
				serverUserName: 'UName2',
				serverPassword: 'PWord2',
				selected: true,
				name: 'Server2',
			}
		];
	});

	it('should add a new server', () => {
		let mockServer = {
			serverAddress: 'MockAddress',
			serverUserName: 'MockUsername',
			serverPassword: 'MockPassword',
			selected: true,
			name: 'MockName'
		};

		let result = servers(initialState, { type: SERVER_ACTIONS.ADD_SERVER, payload: mockServer });
		expect(result).toBeTruthy;
		expect(result).toContain(mockServer);
	});

	it('should remove a new server', () => {
		let serverToRemove = initialState[1];
		let result = servers(initialState, { type: SERVER_ACTIONS.REMOVE_SERVER, payload: serverToRemove });
		expect(result).not.toContain(serverToRemove);
	});

	it('should return an array of servers', () => {
		let result = servers(initialState, { type: SERVER_ACTIONS.GET_SERVERS, payload: _ });
		expect(result).toBeTruthy();
	});

	it('should return an array of 1 server that has the value of selected', () => {
		let result = servers(initialState, { type: SERVER_ACTIONS.GET_SELECTED_SERVER, payload: _ });
		expect(result[0].selected).toBe(true);
		expect(result.length).toBe(1);
	});

	it('should return an array of 1 server that has the value of selected when setting serve as selected', () => {
		let newSelectedServer: IServer = initialState[0];

		let result = servers(initialState, { type: SERVER_ACTIONS.SET_SELECTED_SERVER, payload: newSelectedServer });
		expect(result[0].selected).toBe(true);
		expect(result.length).toBe(1);
	});
});