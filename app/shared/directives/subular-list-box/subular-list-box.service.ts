import {Injectable, EventEmitter} from 'angular2/core';

export interface ISubularItems {
	name: string;
	id: number;
}

@Injectable()
export class SubularListBoxService {
	public items: EventEmitter<ISubularItems[]>;
	public item: EventEmitter<ISubularItems>;
	private _service: SubularListBoxService;

	constructor() {
		this.items = new EventEmitter();
		this.item = new EventEmitter();
	}

	setItems(items: ISubularItems[]) {
		this.items.emit(items);
	}

	setSelectedItem(item: ISubularItems) {
		this.item.emit(item);
	}

}