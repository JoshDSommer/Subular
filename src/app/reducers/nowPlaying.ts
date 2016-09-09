import { ActionReducer, combineReducers, Action  } from '@ngrx/store';
import { ISong } from '../shared/models';

export const NOW_PLAYING_ACTIONS = {
	QUEUE_TRACK: 'QUEUE_TRACK',
	REMOVE_QUEUED_TRACK: 'QUEUE_TRACK',
	PLAY_TRACK: 'PLAY_TRACK',
	SET_PLAYING_TRACK: 'SET_PLAYING_TRACK'
};

export const nowPlayingTrack = (state = {}, {type, payload}) => {
	switch (type) {
		case NOW_PLAYING_ACTIONS.PLAY_TRACK:
			payload.playing = true;
			return Object.assign({}, payload);
		default:
			return state;
	}
}

export const nowPlayingQueue = (state = [], action: Action) => {
	switch (action.type) {
		case NOW_PLAYING_ACTIONS.PLAY_TRACK:
			return [...state.map((track) => {
				if (action.payload === track) {
					return {
						title: track.title,
						playing: true
					}
				} else {
						return {
						title: track.title,
						playing: false
					}
				}
			})];
		case NOW_PLAYING_ACTIONS.QUEUE_TRACK:
			return [...state, action.payload];

		default:
			return state;
	}
}

