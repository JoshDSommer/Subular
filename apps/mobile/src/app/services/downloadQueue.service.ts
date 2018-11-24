import { Injectable } from '@angular/core';
import { ISong, SubsonicService, IPlaylist } from '@Subular/core';
import * as fs from 'tns-core-modules/file-system';
import { SubularMobileService } from './subularMobile.service';
import { getFile } from 'tns-core-modules/http';

interface ISongToDownload {
  song: ISong;
  onComplete?: Function;
}

@Injectable()
export class DownloadQueueService {
  downloadingPlaylists = false;
  downloadingSongs = false;
  // private worker: Worker;
  private songs: ISongToDownload[] = [];
  //non worker service
  private worker = {
    postMessage(msg) {
      getFile(
        {
          url: msg.url,
          method: 'GET'
        },
        msg.path
      ).then(
        () => {
          this.onmessage();
        },
        error => {
          this.error();
        }
      );
    },
    onmessage: null,
    onerror: null
  };
  constructor(private subular: SubularMobileService) {
    //	this.worker = this.workers.initDownloadWorker();
    this.worker.onerror = error => {
      console.error(error.message);
    };
  }

  addSongToTheQueue(song: ISongToDownload): boolean {
    const path = fs.path.join(
      fs.knownFolders.documents().path,
      song.song.id.toString() + '.mp3'
    );
    if (!fs.File.exists(path)) {
      this.songs = [...this.songs, song];
      if (!this.downloadingSongs) {
        this.downloadingSongs = true;
        this.processSongsQueue();
      }
      return true;
    } else {
      this.subular.StoreCachedSong(song.song);
      return false;
    }
  }

  processSongsQueue() {
    if (this.songs && this.songs.length > 0) {
      const song = this.songs[0].song;
      const onComplete = this.songs[0].onComplete;

      let url = this.subular.getDownloadUrl(song.id);
      let path = fs.path.join(
        fs.knownFolders.documents().path,
        song.id.toString() + '.mp3'
      );

      this.worker.onmessage = m => {
        this.subular.StoreCachedSong(song);
        if (onComplete) {
          onComplete();
        }
        this.songs = [...this.songs.slice(1)];
        // process the next song in the queue
        this.processSongsQueue();
      };
      this.worker.postMessage({ url, path });
    } else {
      this.downloadingSongs = false;
    }
  }
}
