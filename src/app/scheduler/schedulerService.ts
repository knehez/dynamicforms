import { HttpClient, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SchedulerService {
    private actionUrl = 'scheduler/';

    constructor(protected _http: HttpClient) {
    }

    async reSchedule(schedule) {
        return await this._http.post(this.actionUrl + 'reschedule', schedule).toPromise();
    }

    async getAllJobs() {
        return await this._http.post(this.actionUrl + 'alljobs', {}).toPromise();
    }

    async optimize(jobs, weights, iteration, population, scheduleStart) {
        return await this._http.post(this.actionUrl + 'optimize',
            { jobs: jobs, weights: weights, iteration: iteration, population: population, scheduleStart: scheduleStart }).toPromise();
    }


    async saveScheduling(params) {
        return await this._http.post('backend/schedules', params).toPromise();
    }

    async updateScheduling(params, id) {
        return await this._http.put('backend/schedules/' + id, params).toPromise();
    }
}
