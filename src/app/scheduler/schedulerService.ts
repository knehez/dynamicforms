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
    async optimize(jobs, weights, iteration, population) {
        return await this._http.post(this.actionUrl + 'optimize',
            { jobs: jobs, weights: weights, iteration: iteration, population: population }).toPromise();
    }


    async saveScheduling(params) {
        return await this._http.post('backend/schedules', params).toPromise();
    }

    async updateScheduling(params, id) {
        return await this._http.put('backend/schedules/' + id, params).toPromise();
    }
}
