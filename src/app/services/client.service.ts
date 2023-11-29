import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.smix.com.ng/";

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    fetchingData = false;

    constructor(private http: HttpClient) {}

    getClient(clientid:string){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.get<any>(API_BASE + `client/${clientid}`, {headers});
    }

    getClients(){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };

        return this.http.get<any>(API_BASE + "client/", {headers});
    }

    newClient(clientData:any){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.post<any>(API_BASE + "client/new", clientData, {headers});
    }

    deleteClient(clientid:string){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.delete<any>(API_BASE + `client/${clientid}`, {headers});
    }

    updateClient(clientid: string, clientData:any){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.post<any>(API_BASE + `client/${clientid}`, clientData, {headers});
    }

    sendFeedBack(name:string, email:string, pagename:string, pageurl:string, message:string, pageimage?:File){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };

        // arrange in form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('pagename', pagename);
        formData.append('pageurl', pageurl);
        formData.append('message', message);
        if(pageimage) formData.append('pageimage', pageimage);

        return this.http.post<any>(API_BASE + "auth/newfeedback", formData, {headers});
    }
}
