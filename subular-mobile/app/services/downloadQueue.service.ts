import { Injectable } from '@angular/core';
import { ISong, SubsonicService } from 'subular';
import { WorkerService } from './worker.service';
import * as fs from "file-system";
import * as utilModule from "utils/utils";
import { SubularMobileService } from './subularMobile.service';

@Injectable()
export class DownloadQueueService {
	downloading = false;
	private worker: Worker;
	private songs: ISong[] = [];
	constructor(private workers: WorkerService, private subular: SubularMobileService) {
		this.worker = this.workers.initDownloadWorker();
	}


	addSongToTheQueue(song: ISong) {
		this.songs = [...this.songs, song];
		if (!this.downloading) {
			this.downloading = true;
			this.processQueue();
		}

	}

	processQueue() {
		console.log('downloading songs', JSON.stringify(this.songs.map(s => s.id)));
		if (this.songs && this.songs.length > 0) {
			const song = this.songs[0];
			console.log('starting download', song.id.toString())
			let url = this.subular.getDownloadUrl(song.id);
			let path = fs.path.join(fs.knownFolders.documents().path, song.id.toString() + '.mp3');

			// let coverPath = fs.path.join(fs.knownFolders.documents().path, song.coverArt + '.png');
			// let coverUrl = this.subular.subsonicGetCoverUrl(song, 600);


			this.worker.onmessage = m => {
				console.log('downloaded', song.title);
				this.subular.StoreCachedSong(song);

				this.songs = [...this.songs.slice(1)];
				// process the next song in the queue
				this.processQueue();
			}

			// if (fs.File.exists(coverPath)) {
			// 	worker.postMessage({ url, path })
			// 	return;
			// }
			// worker.postMessage({ url: coverUrl, path: coverPath })
			this.worker.postMessage({ url, path })
		} else {
			console.log('no songs to download')
			this.downloading = false;
		}
	}


}