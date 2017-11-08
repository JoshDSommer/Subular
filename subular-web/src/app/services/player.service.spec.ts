import { PlayerService } from "./player.service";
import { SubsonicService, ISong } from "../../subular-shared/index";


describe('PlayerService', () => {
	let service: PlayerService;
	let mockSubsonicService: SubsonicService;
	beforeEach(() => {

		mockSubsonicService = {} as any;

		service = new PlayerService(mockSubsonicService);
	});

	it('should by truthy', () => {
		expect(service).toBeTruthy();
	});

	it('should add songs to the song list', () => {
		const songToAdd: ISong = {
			id: 1
		} as any;

		service.addSong(songToAdd);

		expect(service.songList).toEqual([songToAdd]);
	});

	it('should add songs to the song list', () => {
		const songsToAdd: ISong[] = [
			{
				id: 1
			}, {
				id: 2
			}
		] as any;

		service.addSongs(songsToAdd);

		expect(service.songList).toEqual(songsToAdd);
	});
});
