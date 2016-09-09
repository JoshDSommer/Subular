
import { ActionReducer  } from '@ngrx/store';
import { IArtist } from '../shared/models';

export const ARTIST_ACTIONS = {
	ADD_ARTISTS: 'ADD_ARTISTS',
	GET_ARTISTS: 'GET_ARTISTS',
};

export const artists: ActionReducer<IArtist[]> = (state = [], {type, payload}) => {
	switch (type) {
		case ARTIST_ACTIONS.ADD_ARTISTS:
			return state.concat(payload);
		case ARTIST_ACTIONS.GET_ARTISTS:
			return state;
		default:
			return state;
	}
};