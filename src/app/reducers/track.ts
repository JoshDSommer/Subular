import { ActionReducer, combineReducers  } from '@ngrx/store';


export interface ISong {
	id?: number;
	title?: string;
	album?: string;
	artist?: string;
	track?: number;
	year?: number;
	genre?: string;
	coverArt?: number;
	duration?: number;
	bitRate?: number;
	path?: string;
	discNumber?: number;
	albumId?: number;
	artistId?: number;
	playing: boolean;
}

export const NOW_PLAYING_ACTIONS = {
	QUEUE_TRACK: 'QUEUE_TRACK',
	REMOVE_QUEUED_TRACK: 'QUEUE_TRACK',
	PLAY_TRACK: 'PLAY_TRACK'
};

export const nowPlayingTrack = (state = {}, {type, payload}) => {
	switch (type) {
		case NOW_PLAYING_ACTIONS.PLAY_TRACK:
			payload.playing = true;
			return payload
		default:
			return state;
	}
}

export const nowPlayingQueue = (state = [], {type, payload}) => {
	switch (type) {
		case NOW_PLAYING_ACTIONS.PLAY_TRACK:
			return state.map((track) => {
				if (payload.id == track.id) {
					return nowPlayingTrack(track, { type: NOW_PLAYING_ACTIONS.PLAY_TRACK, payload: track })
				} else {
					track.playing = false;
					return track;
				}
			});
		default:
			return state;
	}
}

export const nowPlaying = combineReducers({ nowPlayingTrack, nowPlayingQueue })