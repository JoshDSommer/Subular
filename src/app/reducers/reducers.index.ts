
export { servers, SERVER_ACTIONS, IServer   } from './servers';
// export { artists, ARTIST_ACTIONS   } from './artists';
export { appState, APP_STATE_ACTIONS, AppState   } from './appState';
export { nowPlayingQueue, nowPlayingTrack, NOW_PLAYING_ACTIONS   } from './nowPlaying';

export const REDUCERS_DICTONARY = {
	servers: 'servers',
	appState: 'appState',
	nowPlayingTrack: 'nowPlayingTrack',
	nowPlayingQueue: 'nowPlayingQueue'
};