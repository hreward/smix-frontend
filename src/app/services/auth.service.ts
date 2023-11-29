import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.smix.com.ng/";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    fetchingData = false;

    constructor(private http: HttpClient) {}

    login(userData:any){
        const headers = { 'Authorization': 'pkey-fjsdhdfgs' };
        
        return this.http.post<any>(API_BASE + "auth/signin", userData, {headers});
    }

    logout(){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };

        return this.http.get<any>(API_BASE + "auth/logout", {headers});
    }

    signup(userData:any){
        this.fetchingData = true;
        const headers = { 'Authorization': 'pkey-fjsdhdfgs' };
        
        return this.http.post<any>(API_BASE + "business/signup", userData, {headers});
    }

    verifyOTP(email:string, otp:string){
        this.fetchingData = true;
        const headers = { 'Authorization': 'pkey-fjsdhdfgs' };
        
        return this.http.post<any>(API_BASE + "auth/verify/otp", {email, otp}, {headers});
    }

    verifyEmailCode(email:string, code:string){
        this.fetchingData = true;
        const headers = { 'Authorization': 'pkey-fjsdhdfgs' };
        
        return this.http.post<any>(API_BASE + "auth/verifyemailcode", {email, code}, {headers});
    }

    resendEmailCode(email:string){
        this.fetchingData = true;
        const headers = { 'Authorization': 'pkey-fjsdhdfgs' };
        
        return this.http.post<any>(API_BASE + "auth/requestnewemailcode", {email}, {headers});
    }

    requestNewPassword(email:string){
        const headers = { 'Authorization': 'pkey-fjsdhdfgs' };
        
        return this.http.post<any>(API_BASE + "auth/requestnewpassword", {email}, {headers});
    }

    changePassword(email:string, otp:string, newpassword:string){
        const headers = { 'Authorization': 'pkey-fjsdhdfgs' };
        
        return this.http.post<any>(API_BASE + "auth/changepassword", {email, otp, newpassword}, {headers});
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
