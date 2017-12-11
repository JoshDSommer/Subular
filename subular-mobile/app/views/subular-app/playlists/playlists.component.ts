import { Component, OnInit } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { IPlaylists, IPlaylist } from 'subular';
import { Observable } from 'rxjs/Observable';
import { DownloadQueueService } from '../../../services/downloadQueue.service';

@Component({
	moduleId: module.id,
	selector: 'playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {
	playlists$: Observable<IPlaylists>;

	constructor(private subular: SubularMobileService, private download: DownloadQueueService) { }

	ngOnInit() {
		this.playlists$ = this.subular.getPlaylists()
			.do(playlists => {
				playlists.forEach(playlist => {
					this.download.downloadPlaylistCoverArt(playlist)
				})
			})
			.map(playlists => [{ id: 0, name: 'Favorites' } as IPlaylist, ...playlists]);

	}

	getCoverArt(playlist: IPlaylist) {
		const url = this.subular.subsonicGetPlaylistCoverUrl(playlist);
		return url;
	}
}

