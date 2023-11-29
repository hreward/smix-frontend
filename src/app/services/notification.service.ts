import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.coopnex.com/";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(private http: HttpClient) { }

	fetchNotification(page:number){
		let authtoken = "";
		let task = "fetch-notifications";
		if(localStorage.getItem("authtoken")){
				authtoken = localStorage.getItem("authtoken")+'';
		}

		const headers = { 'authtoken': authtoken, 'Authorization': 'pkey-fjsdhdfgs', task };
		return this.http.post<any>(API_BASE + "notifications", {page}, {headers});
	}

	fetchUnreadNotification(){
		let authtoken = "";
		let task = "fetch-unread-notifications";
		if(localStorage.getItem("authtoken")){
				authtoken = localStorage.getItem("authtoken")+'';
		}

		const headers = { 'authtoken': authtoken, 'Authorization': 'pkey-fjsdhdfgs', task };
		return this.http.get<any>(API_BASE + "notifications", {headers});
	}

	readNotification(reference:string){
		let authtoken = "";
		let task = "read-notification";
		if(localStorage.getItem("authtoken")){
				authtoken = localStorage.getItem("authtoken")+'';
		}

		const headers = { 'authtoken': authtoken, 'Authorization': 'pkey-fjsdhdfgs', task };
		return this.http.post<any>(API_BASE + "notifications", {reference}, {headers});
	}

	checkNewUnread(){
		let authtoken = "";
		let task = "fetch-new-unread";
		if(localStorage.getItem("authtoken")){
			authtoken = localStorage.getItem("authtoken")+'';
		}

		const headers = { 'authtoken': authtoken, 'Authorization': 'pkey-fjsdhdfgs', task };
		return this.http.get<any>(API_BASE + "notifications", {headers});
	}


}
