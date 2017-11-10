import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ISong, SubsonicService } from '../../../../subular-shared/index';

@Component({
	selector: 'heart',
	templateUrl: 'heart.component.html',
	styleUrls: ['heart.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeartComponent {
	@Input() song: ISong;
	get isHearted() {
		console.log(this.song);
		return this.song.starred;
	}
	constructor(private subsonic: SubsonicService) { }

	unHeartSong() {
		this.song = { ...this.song, starred: null };
		this.subsonic.unStarSong(this.song.id).subscribe();
	}

	heartSong() {
		this.song = { ...this.song, starred: new Date() };
		this.subsonic.starSong(this.song.id).subscribe();
	}

}
