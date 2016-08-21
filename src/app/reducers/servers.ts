
import * as _ from 'lodash';
import * as cryptoJs from 'crypto-js';

import { ActionReducer  } from '@ngrx/store';

export interface IServer {
	serverAddress: string;
	serverUserName: string;
	serverPassword: string;
	selected: boolean;
	salt: string;
	name?: string;
}

export const SERVER_ACTIONS = {
	ADD_SERVER: 'ADD_SERVER',
	GET_SERVERS: 'GET_SERVERS',
	GET_SELECTED_SERVER: 'GET_SELECTED_SERVER',
	REMOVE_SERVER: 'REMOVE_SERVER',
	SET_SELECTED_SERVER: 'SET_SELECTED_SERVER'
};

export const servers: ActionReducer<IServer[]> = (state = [], {type, payload}) => {
	switch (type) {
		case SERVER_ACTIONS.GET_SERVERS:
			return state;
		case SERVER_ACTIONS.ADD_SERVER:
			return AddServer(state, payload);
		case SERVER_ACTIONS.REMOVE_SERVER:
			return _.without(state, payload);
		case SERVER_ACTIONS.GET_SELECTED_SERVER:
			return state.filter((server) => (server.selected));
		case SERVER_ACTIONS.SET_SELECTED_SERVER:
			return setSelectedServer(state, payload);
		default:
			return state;
	}
};

function AddServer(state: IServer[], server): IServer[] {
	let saltedServer = SetSalt(server);
	let password = SetPassword(saltedServer);
	return [...state, password];
}

function setSelectedServer(state: IServer[], payload: IServer): IServer[] {
	return state.filter((server) => {
		if (server === payload) {
			server.selected = true;
			return true;
		} else {
			server.selected = false;
			return false;
		}
	});
}


function SetPassword(server: IServer): IServer {
	server.serverPassword = cryptoJs.MD5(server.serverPassword + server.salt).toString();
	return server;
}

function SetSalt(server: IServer): IServer {
	server.salt = '';
	let possibleValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let index = 0; index < 15; index++) {
		server.salt += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length));
	}

	return server;
}

