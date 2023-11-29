import { Injectable } from '@angular/core';

export interface User {
    id: any,
    username: any,
    firstname: any,
    lastname: any,
    email: any,
    sex: any,
    dob: any,
    phone: any,
    country: any,
    state: any,
    currentcity: any,
    address: any,
    avatar: any,
    financialgoal: any,
    profilevisibility: any,
    emailnotification: any,
    cards: any[],
    bankaccounts: any[]
    coops: any[]
}

export const emptyuser:User = {
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    sex: "",
    dob: "",
    phone: "",
    country: "",
    state: "",
    currentcity: "",
    address: "",
    avatar: "",
    financialgoal: "",
    profilevisibility: "",
    emailnotification: "",
    cards: [],
    bankaccounts: [],
    coops: []
}


@Injectable({
    providedIn: 'root'
})
export class CurrentUser {
    currentUser = emptyuser;
    constructor() {}
    
    saveCurrentUser(user:User){
        this.currentUser = user;
    }

}