
import { ActionReducer  } from '@ngrx/store';


export interface IArtist {
	id: number;
	name: string;
	albumCount: number;
	coverArt: string;
}

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