import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { emptyuser, User } from '../interfaces/user';
import { GlobalDataService } from './global-data.service';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.coopnex.com/";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    thisUser:User = emptyuser;
    constructor(private http:HttpClient, private toast:HotToastService, private globalDataService: GlobalDataService){}

    businessDetails(){
        const authtoken = localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        if(localStorage.getItem("cauthtoken")===null){
            return;
        }
        
        this.http.get<any>(API_BASE + "user", {headers}).subscribe({
            next: (data:any) => {
                if(data.status && data.success){
                    this.thisUser.id = data.data.id;
                    this.thisUser.username = data.data.username;
                    this.thisUser.firstname = data.data.firstname;
                    this.thisUser.lastname = data.data.lastname;
                    this.thisUser.email = data.data.email;
                    this.thisUser.sex = data.data.sex;
                    this.thisUser.dob = data.data.dob;
                    this.thisUser.phone = data.data.phone;
                    this.thisUser.country = data.data.country;
                    this.thisUser.currentcity = data.data.currentcity;
                    this.thisUser.address = data.data.address;
                    this.thisUser.avatar = data.data.avatar;
                    this.thisUser.profilevisibility = data.data.profilevisibility;
                    this.thisUser.emailnotification = data.data.emailnotification;
                    this.thisUser.financialgoal = data.data.financialgoal;
                    this.thisUser.cards = data.data.cards;
                    this.thisUser.bankaccounts = data.data.bankaccounts;
                    this.thisUser.coops = data.data.coops;

                    //save details to lds
                    // this.lds.setJSON("tufd", this.thisUser);
                    this.globalDataService.thisUser.next(this.thisUser);
                    this.globalDataService.isLogin.next(true);
                } else if(data.message.toLowerCase() == "no session found"){
                    //this.toast.error(data.message);
                    //this.authService.ui_login();
                } else {
                    this.toast.error(data.message);
                }
            },
            error: (data) => {
                // const regex = /.*session token \w+ not found.*/;
                const regex = /.*session token*/;
                const regex2 = /.*not found.*/;
                if(data.status === 401 && regex.test(data.error.message.toLowerCase()) && regex2.test(data.error.message.toLowerCase()) ){
                    this.toast.info("Your session has expired. You need to login", {id:"loginrequired"});
                    //open login modal
                    // this.globalDataService.loginModalOpen.next(true);
                } else {
                    // this.toast.error("Check internet connection", {id:"connectionerror"});
                }
            }
        });
    }

    updateProfile(userData:any){
        const authtoken = localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.post<any>(API_BASE + "business/update", userData, {headers});
    }

    updateAvatar(file:File){
        let formData = new FormData(); 
        formData.append("avatar", file);

        const authtoken = localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.post<any>(API_BASE + "user/update/avatar", formData, {headers});
    }
    
}