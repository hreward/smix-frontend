import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { emptyuser, User } from '../interfaces/user';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.smix.com.ng/";


@Injectable({
    providedIn: 'root'
})
export class BusinessService {

    thisUser:User = emptyuser;
    constructor(private http:HttpClient){}

    getBusinessDetails(){
        const authtoken = localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.get<any>(API_BASE + "business", {headers});
    }

    updateBusiness(userData:any){
        const authtoken = localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.post<any>(API_BASE + "business/update/", userData, {headers});
    }

    updateLogo(file:File){
        let formData = new FormData(); 
        formData.append("avatar", file);

        const authtoken = localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.post<any>(API_BASE + "business/update/avatar", formData, {headers});
    }
    
}