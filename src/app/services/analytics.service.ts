import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.smix.com.ng/";

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    fetchingData = false;

    constructor(private http: HttpClient) {}


    getAnalytics(){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };

        return this.http.get<any>(API_BASE + "analytics/", {headers});
    }

    getRevenue(){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };

        return this.http.get<any>(API_BASE + "analytics/revenue", {headers});
    }
}
