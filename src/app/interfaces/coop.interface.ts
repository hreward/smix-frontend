import { Injectable } from '@angular/core';

export interface Coop {
    id: any,
    logo: any,
    name: string,
    coopId: string,
    startDate: any,
    regId: any,
    country: any,
    state: any,
    city: any,
    address: any,
    coopBio: any,
    coreMission: any,
    status: any,
    executives: any[],
    member: []
}

export interface OtherUser {
    firstname: any,
    lastname: any,
    sex: any,
    avatar: any,
    coverphoto: any
}

export interface CoopExecutive {
    firstname: any,
    lastname: any,
    sex: any,
    avatar: any,
    coverphoto: any,
    verified: boolean
}

// export const emptycoop: Coop = {
//     id: '',
//     logo: '',
//     name: '',
//     coopId: '',
//     startDate: '',
//     regId: any,
//     country: any,
//     state: any,
//     city: any,
//     address: any,
//     coopBio: any,
//     coreMission: any,
//     status: any,
//     executives: any[],
//     member: []
// }

@Injectable({
    providedIn: 'root'
})
export class CurrentCoop {
    
    // currentCoop = emptycoop;
    // constructor() {}
    

    // getWallet(){
    //     return this.currentCoop;
    // }
}