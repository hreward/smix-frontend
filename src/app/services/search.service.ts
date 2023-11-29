import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.coopnex.com/";

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(private http:HttpClient) { }

	searchCoops(searchStr:string, loadingStr?:string){
        let authtoken=localStorage.getItem("cauthtoken") || "";
       
        const headers = { 'Authorization': authtoken};
        return this.http.get<any>(API_BASE + `coop/search/${searchStr}/${loadingStr}`, {headers});
	}

	exploreCoops(loadingStr:string){ 
        let authtoken=localStorage.getItem("cauthtoken") || "";
       
        const headers = { 'Authorization': authtoken};
        return this.http.get<any>(API_BASE + `coop/explore/${loadingStr}`, {headers, withCredentials:true});
	}
}
