import { Injectable } from "@angular/core";

@Injectable()
export class WorkerService {
	constructor() {
	}

	initDownloadWorker() {
		let worker: Worker;

		if ((<any>global).TNS_WEBPACK) {
			const JsWorker = require("nativescript-worker-loader!../workers/download.worker.js");
			worker = new JsWorker();
		} else {
			worker = new Worker("../workers/download.worker.js");
		}

		return worker;
	}
}