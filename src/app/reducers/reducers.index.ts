
export { servers, SERVER_ACTIONS, IServer   } from './servers';
export { artists, ARTIST_ACTIONS, IArtist   } from './artists';
export { appState, APP_STATE_ACTIONS, AppState   } from './appState';
export { nowPlaying, NOW_PLAYING_ACTIONS   } from './track';

export const REDUCERS_DICTONARY = {
	servers: 'servers',
	artists: 'artists',
	appState: 'appState',
	nowPlaying: 'nowPlaying'
};