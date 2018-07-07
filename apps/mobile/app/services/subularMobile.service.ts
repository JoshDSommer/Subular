import { Injectable } from '@angular/core';
import {
  SubsonicService,
  SubsonicCachedService,
  ISong,
  IArtist,
  IAlbum,
  IPlaylist,
  SongState
} from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { getFile } from 'tns-core-modules/http';
import * as fs from 'tns-core-modules/file-system';
import { getString, setString } from 'tns-core-modules/application-settings';
import * as connectivity from 'tns-core-modules/connectivity';
import { CurrentConnectionService } from './currentConnection.service';
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

interface ISubularService {
  subsonic: SubsonicService;
  cachedData: SubsonicCachedService;
}

export const CACHED_SONGS_KEY = 'subular.cached.songs';
export const CACHED_PLAYLISTS_KEY = 'subular.cached.playlists';

@Injectable()
export class SubularMobileService {
  private currentConnectionType: connectivity.connectionType;
  private subsonicService: ISubularService;

  private songDownloaded = songId => {
    const localFile = fs.path.join(
      fs.knownFolders.documents().path,
      songId + '.mp3'
    );
    const fileExists = fs.File.exists(localFile);
    return fileExists;
  };

  constructor(
    subsonic: SubsonicService,
    private cachedData: SubsonicCachedService,
    private connection: CurrentConnectionService
  ) {
    const getOnlineServices = () => ({ subsonic, cachedData });
    const getOfflineServices = () =>
      ({
        subsonic: this.getMobileSubularService(subsonic),
        cachedData: {
          getCachedData: () => of(true),
          getArtists: () => this.getArtistFromCache(),
          getAlbums: () => this.getAlbumsFromCache()
        }
      } as any);

    this.connection.connectionType$.subscribe(connectionType => {
      this.currentConnectionType = connectionType;
      switch (connectionType) {
        case connectivity.connectionType.none:
          this.subsonicService = getOfflineServices();
          break;
        case connectivity.connectionType.wifi:
          this.subsonicService = getOnlineServices();
          break;
        case connectivity.connectionType.mobile:
          this.subsonicService = getOfflineServices();
          break;
      }
    });
  }

  private getMobileSubularService(subsonic: SubsonicService) {
    return {
      getSongs: albumId => this.getCachedSongs(albumId),
      // right now i'm still getting playlists via mobile
      getPlaylists: () => subsonic.getPlaylists(),
      getPlaylist: id => subsonic.getPlaylist(id),
      subsonicGetCoverUrl: () => '',
      pingServer: () => subsonic.pingServer(),
      getRecentAdditions: () => subsonic.getRecentAdditions()
    };
  }

  getPlaylists() {
    return this.subsonicService.subsonic
      .getPlaylists()
      .pipe(tap(playlists => this.setValue(CACHED_PLAYLISTS_KEY, playlists)));
  }

  addToPlaylist(song: ISong, playlistId: number) {
    return this.subsonicService.subsonic.addSongToPlaylist(song, playlistId);
  }

  removeFromPlaylist(songIndex: number, playlistId: number): Observable<void> {
    return this.subsonicService.subsonic.removeSongFromPlaylist(
      songIndex,
      playlistId
    );
  }

  getPlaylist(id: number): Observable<IPlaylist> {
    return this.subsonicService.subsonic.getPlaylist(id).pipe(
      map(playlist => {
        playlist.entry = playlist.entry.map(song => {
          const downloaded = this.songDownloaded(song.id);
          song.state = downloaded ? SongState.downloaded : song.state;
          return song;
        });
        return playlist;
      })
    );
  }

  getRecentAdditions() {
    return this.subsonicService.subsonic.getRecentAdditions();
  }

  getDownloadUrl(id: number): string {
    return this.subsonicService.subsonic.getDownloadUrl(id);
  }

  getStreamUrl(id: number): string {
    return this.subsonicService.subsonic.getStreamUrl(id);
  }

  getSongs(albumId: number): Observable<ISong[]> {
    return this.subsonicService.subsonic.getSongs(albumId).pipe(
      map(songs => {
        songs = songs.map(song => {
          if (song.state != SongState.downloaded) {
            const downloaded = this.songDownloaded(song.id);
            song.state = downloaded ? SongState.downloaded : song.state;
          }
          return song;
        });
        return songs;
      })
    );
  }
  pingServer() {
    return this.subsonicService.subsonic.pingServer();
  }
  getArtWork(artWorkUrl, size = 1) {
    let coverPath = fs.path.join(
      fs.knownFolders.documents().path + '/images',
      artWorkUrl + '.png'
    );
    const exists = fs.File.exists(coverPath);
    const fileSize = fs.knownFolders
      .documents()
      .getFolder('images')
      .getFile(artWorkUrl + '.png').size;

    if (exists && fileSize > 200) {
      return of(coverPath);
    }
    if (fileSize <= 200) {
      fs.knownFolders
        .documents()
        .getFolder('images')
        .getFile(artWorkUrl + '.png')
        .remove()
        .then();
    }
    return new Observable(observer => {
      observer.next('~/images/coverArt.png');
      getFile(
        {
          url: this.subsonicService.subsonic.subsonicGetCoverUrl(
            artWorkUrl as any
          ),
          method: 'GET'
        },
        coverPath
      ).then(
        () => {
          observer.next(coverPath);
          observer.complete();
        },
        error => {
          observer.complete();
        }
      );
    });
  }

  starSong(id: number) {
    return this.subsonicService.subsonic.starSong(id);
  }
  unStarSong(id: number) {
    return this.subsonicService.subsonic.unStarSong(id);
  }
  getArtists(): Observable<IArtist[]> {
    //return this.getArtistFromCache();
    return this.subsonicService.cachedData.getArtists();
  }
  getAlbums(): Observable<IAlbum[]> {
    //return this.getAlbumsFromCache();
    return this.subsonicService.cachedData.getAlbums();
  }
  getArtistById(id: number): Observable<IArtist> {
    return this.subsonicService.cachedData.getArtistById(id);
  }
  getCachedData() {
    return this.subsonicService.cachedData.getCachedData();
  }

  StoreCachedSong(song: ISong) {
    const cachedSongs = this.getValue(CACHED_SONGS_KEY) || [];
    const cachedSongExists = cachedSongs.find(
      cachedSong => cachedSong.id === song.id
    );
    if (!cachedSongExists) {
      const updatedSongs = [...cachedSongs, song];
      this.setValue(CACHED_SONGS_KEY, updatedSongs);
    }
  }

  private sortByName = (array: Array<{ name: string }>) => {
    const cleanName = (name: string) =>
      name.replace('the ', '').replace('los ', '');
    return array.sort((a, b) => {
      const bName = cleanName(b.name);
      const aName = cleanName(a.name);
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });
  };

  getPlaylistSongsFromCache(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  private getPlaylistsFromCache(): Observable<IPlaylist[]> {
    const cachedPlaylists = this.getValue(CACHED_PLAYLISTS_KEY);
    if (cachedPlaylists) {
      return of(cachedPlaylists);
    }
    return of([]);
  }

  private getArtistFromCache(): Observable<IArtist[]> {
    const cachedSongs = this.getValue(CACHED_SONGS_KEY);
    if (cachedSongs) {
      const cachedSongsToArtist = cachedSongs.map(
        song => ({ id: song.artistId, name: song.artist } as IArtist)
      );
      const artists = cachedSongsToArtist.filter(
        (artist, index, self) =>
          self.findIndex(t => t.id === artist.id) === index
      ) as IArtist[];
      return of(this.sortByName(artists) as IArtist[]);
    }
    return of([]);
  }

  private getAlbumsFromCache(): Observable<IAlbum[]> {
    const cachedSongs = this.getValue(CACHED_SONGS_KEY);
    if (cachedSongs) {
      const cachedSongsToAlbums = cachedSongs.map(
        song =>
          ({
            id: song.albumId,
            name: song.album,
            artist: song.artist,
            coverArt: song.coverArt,
            artistId: song.artistId
          } as IAlbum)
      );
      const albums = cachedSongsToAlbums.filter(
        (album, index, self) => self.findIndex(t => t.id === album.id) === index
      );
      return of(this.sortByName(albums) as IAlbum[]);
    }
    return of([]);
  }

  private getCachedSongs(albumId: number) {
    const cachedSongs = this.getValue(CACHED_SONGS_KEY) as ISong[];
    const filteredSongs = cachedSongs.filter(song => song.albumId === albumId);
    const orderedSongs = filteredSongs.sort((a, b) => {
      if (a.track < b.track) return -1;
      if (a.track > b.track) return 1;
      return 0;
    });
    return of(filteredSongs);
  }

  private getValue(key: string): any {
    const value = getString(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  private setValue(key: string, value: any): void {
    setString(key, JSON.stringify(value));
  }
}
