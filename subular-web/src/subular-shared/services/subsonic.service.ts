import { Injectable } from '@angular/core';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ISong, IPlaylist, IAlbum } from '../interfaces';
import { IPlaylists } from '../interfaces/playlist';

@Injectable()
export class SubsonicService {

	constructor(private authentication: SubsonicAuthenticationService, private http: Http) { }

	pingServer(): Observable<boolean> {
		return this.subsonicGet('ping')
			.map(data => data.subresp.status === 'ok')
			.catch(() => Observable.of(false));
	}

	getStreamUrl(id: number): string {
		return `${this.authentication.getServerURl('stream')}&id=${id}`;
	}

	getDownloadUrl(id: number): string {
		return `${this.authentication.getServerURl('download')}&id=${id}`;
	}


	getHLSStream(id: number) {

		return `${this.authentication.getHLSURl(id)}`;
	}

	getPlaylists(): Observable<IPlaylists> {
		return this.subsonicGet('getPlaylists').map(data => data.subresp.playlists.playlist);
	}

	getRecentAdditions(): Observable<IAlbum[]> {
		return this.subsonicGet('getAlbumList2', '&type=newest&size=50')
			.map(response => response.subresp.albumList2.album)
	}

	getPlaylist(id: number): Observable<IPlaylist> {
		return this.subsonicGet('getPlaylist', `&id=${id}`)
			.map(data => data.subresp.playlist)
			.map(playlist => {
				playlist.entry = playlist.entry.map((song: ISong) => {
					const measuredTime = new Date(song.duration * 1000);
					const timeWithoutHours = measuredTime.toISOString().substr(14, 5);
					const timeWithHours = measuredTime.toISOString().substr(11, 8);
					song.time = timeWithHours.startsWith('00:') ? timeWithoutHours : timeWithHours;
					return song;
				});
				return playlist;
			});
	}

	createPlaylist(name: string): Observable<number> {
		return this.subsonicGet('createPlaylist', `&name=${name}`);
	}

	addSongToPlaylist(song: ISong, playlistId: number) {
		return this.subsonicGet('updatePlaylist', `&playlistId=${playlistId}&songIdToAdd=${song.id}`);
	}

	changePlaylistName(name: string, playlistId: number) {
		return this.subsonicGet('updatePlaylist', `&playlistId=${playlistId}&name=${name}`);
	}

	removeSongFromPlaylist(songIndexToRemove, playlistId: number) {
		return this.subsonicGet('updatePlaylist', `&playlistId=${playlistId}&songIndexToRemove=${songIndexToRemove}`);
	}

	getSongs(albumId: number): Observable<ISong[]> {
		return this.subsonicGet('getAlbum', `&id=${albumId}`)
			.map(data => data.subresp.album.song)
			.map(songs => {
				return songs.map((song: ISong) => {
					const measuredTime = new Date(song.duration * 1000);
					const timeWithoutHours = measuredTime.toISOString().substr(14, 5);
					const timeWithHours = measuredTime.toISOString().substr(11, 8);
					song.time = timeWithHours.startsWith('00:') ? timeWithoutHours : timeWithHours;
					return song;
				});
			});
	}

	getTopSongs(artistName): Observable<ISong[]> {
		return this.subsonicGet('getTopSongs', `&artist=${artistName}`);
	}

	subsonicGetCoverUrl(id: number, size = 274): string {
		return this.authentication.getServerURl('getCoverArt') + `&id=${id}&size=${274}`;
	}

	starSong(id: number) {
		return this.subsonicGet('star', `&id=${id}`);
	}
	unStarSong(id: number) {
		return this.subsonicGet('unstar', `&id=${id}`);
	}

	subsonicGet(method: string);
	subsonicGet(method: string, additionalParams: string);
	subsonicGet(method: string, additionalParams?: string) {
		const url = additionalParams ? this.authentication.getServerURl(method) + additionalParams : this.authentication.getServerURl(method);
		if (url === '' || url === additionalParams) {
			return Observable.of(false);
		}

		return this.http.get(url)
			.map(response => response.json())
			.map(data => JSON.parse(JSON.stringify(data).replace('subsonic-response', 'subresp')));
	}
}
