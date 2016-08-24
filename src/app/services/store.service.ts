import { Injectable } from "@angular/core";
import { Store, combineReducers } from "@ngrx/store";

@Injectable()
export class StoreService {
    private _reducers: any = {};

    constructor(private store: Store<any>) { }

    addReducers(reducers: any) {
        const reducerKeys = Object.keys(reducers);

        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            this._reducers[key] = reducers[key];
        }

        this.store.replaceReducer(combineReducers(this._reducers));
    }
}