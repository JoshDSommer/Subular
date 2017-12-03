import { Injectable } from '@angular/core';
import { ISong, SubsonicService } from 'subular';
import { WorkerService } from './worker.service';
import * as fs from "file-system";
import * as utilModule from "utils/utils";
import { SubularMobileService } from './subularMobile.service';

interface ISongToDownload {
	song: ISong;
	onComplete?: Function;
}

@Injectable()
export class DownloadQueueService {
	downloading = false;
	private worker: Worker;
	private songs: ISongToDownload[] = [];
	constructor(private workers: WorkerService, private subular: SubularMobileService) {
		this.worker = this.workers.initDownloadWorker();
	}


	addSongToTheQueue(song: ISongToDownload) {
		this.songs = [...this.songs, song];
		if (!this.downloading) {
			this.downloading = true;
			this.processQueue();
		}

	}

	processQueue() {
		if (this.songs && this.songs.length > 0) {
			const song = this.songs[0].song;
			const onComplete = this.songs[0].onComplete;

			let url = this.subular.getDownloadUrl(song.id);
			let path = fs.path.join(fs.knownFolders.documents().path, song.id.toString() + '.mp3');

			let coverPath = fs.path.join(fs.knownFolders.documents().path, song.coverArt + '.png');
			let coverUrl = this.subular.subsonicGetCoverUrl(song, 600);


			this.worker.onmessage = m => {
				this.subular.StoreCachedSong(song);
				if (onComplete) {
					onComplete();
				}
				this.songs = [...this.songs.slice(1)];
				// process the next song in the queue
				this.processQueue();
			}

			if (fs.File.exists(coverPath)) {
				this.worker.postMessage({ url, path })
				return;
			}
			this.worker.postMessage({ url: coverUrl, path: coverPath })
			this.worker.postMessage({ url, path })
		} else {
			this.downloading = false;
		}
	}


}