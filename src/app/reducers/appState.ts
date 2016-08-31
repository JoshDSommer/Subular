import { ActionReducer  } from '@ngrx/store';

export enum AppState {
	loading,
	playing,
	paused
}

export const APP_STATE_ACTIONS = {
	LOADING: 'LOADING',
	PLAYING: 'PLAYING',
	PAUSED: 'PAUSED'
};

export const appState: ActionReducer<AppState> = (state:AppState = AppState.loading, {type}) => {
	switch (type) {
		case APP_STATE_ACTIONS.LOADING:
			return AppState.loading;
		case APP_STATE_ACTIONS.PAUSED:
			return AppState.paused;
		case APP_STATE_ACTIONS.PLAYING:
			return AppState.playing;
		default:
			return state;
	}
};
