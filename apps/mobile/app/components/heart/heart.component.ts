import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SubularMobileService } from '../../services/subularMobile.service';
import { ISong } from '@Subular/core';
@Component({
	moduleId: module.id,
	selector: 'heart',
	templateUrl: 'heart.component.html',
	styleUrls: ['heart.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeartComponent {
	@Input() song: ISong;
	@Output() songUpdated = new EventEmitter<ISong>();
	@Input() row: number;
	@Input() col: number;

	get isHearted() {
		return this.song.starred;
	}
	constructor(private subsonic: SubularMobileService) { }

	unHeartSong() {
		this.song = Object.assign({}, this.song, { starred: null });
		this.subsonic.unStarSong(this.song.id).subscribe();
		this.songUpdated.next(this.song);
	}

	heartSong() {
		this.song = Object.assign({}, this.song, { starred: new Date() });
		this.subsonic.starSong(this.song.id).subscribe();
		this.songUpdated.next(this.song);
	}

}
