import { HttpClient, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class SchedulerService {
    private actionUrl = 'scheduler/';

    constructor(protected _http: HttpClient) {
    }

    async reSchedule(object) {
        return await this._http.post(this.actionUrl + 'reschedule', object).toPromise();
    }

    async getAllJobs() {
        return await this._http.post(this.actionUrl + 'alljobs', {}).toPromise();
    }
    /*
        async optimize(jobs, weights, iteration, population) {
            return await this._http.post(this.actionUrl + 'optimize',
                { jobs: jobs, weights: weights, iteration: iteration, population: population }).toPromise();
        }
    */
    optimize(jobs, weights, iteration, population): Observable<any> {
        return this._http.post(this.actionUrl + 'optimize',
            { jobs: jobs, weights: weights, iteration: iteration, population: population });
    }


    async saveScheduling(params) {
        return await this._http.post('backend/schedules', params).toPromise();
    }

    saveScheduling2(params) {
        return new Promise((resolve, reject) => {
            this._http.post('backend/schedules', params)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
}
