import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GeneralRestService {
    public objectName = '';

    private actionUrl = 'backend/';

    constructor(protected _http: HttpClient) {
    }

    getAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._http.get(`${this.actionUrl}${this.objectName}`)
                .subscribe(res => {
                    resolve(res as []);
                }, (err) => {
                    reject(err);
                });
        });
    }

    async getAllSync(objectName) {
        return await this._http.get(`${this.actionUrl}${objectName}`).toPromise();
    }

    save(obj) {
        return new Promise((resolve, reject) => {
            this._http.post(`${this.actionUrl}${this.objectName}`, obj)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    update(obj) {
        return new Promise((resolve, reject) => {
            this._http.put(`${this.actionUrl}${this.objectName}/${obj.id}`, obj)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    delete(obj) {
        return new Promise((resolve, reject) => {
            this._http.delete(`${this.actionUrl}${this.objectName}/${obj.id}`, obj)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    getOne(id: number): Observable<any> {
        return this._http.get(`${this.actionUrl}${id}`) as Observable<any>;
    }
}
