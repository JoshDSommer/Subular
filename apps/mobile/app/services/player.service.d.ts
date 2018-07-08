import { Injectable } from '@angular/core';
import { ISong, SubsonicService } from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum PlayingStatus {
  loading,
  paused,
  playing
}

export interface IAudioPlayingInfo {
  song: ISong;
  playing: PlayingStatus;
  remainingTime?: number;
  position?: number;
  mins?: number;
  secs?: number;
  repeat?: boolean;
  random?: boolean;
}

declare class PlayerService {
  nowPlaying$: Observable<IAudioPlayingInfo>;
  queue$: Observable<ISong[]>;
  songList: ISong[];

  private _repeat: boolean;
  private _random: boolean;

  clearSongs(): void;

  addSong(song: ISong): void;

  addAndPlaySong(song: ISong): void;

  addSongs(songs: ISong[]): void;

  addSongsAndPlaySong(songs: ISong[], song: ISong);

  updateSong(song: ISong);

  shuffleSongs(firstSong: ISong): void;

  toggleRepeat();

  toggleShuffle();

  playSong(index?: number): void;

  pauseSong(): void;

  resumeSong(): void;

  playNextSong();

  playPreviousSong();

  songUpdated(song: ISong);
}
