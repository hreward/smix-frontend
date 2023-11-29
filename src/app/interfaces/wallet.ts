import { Injectable } from '@angular/core';

export interface Wallet {
    id: string,
    name: string,
    email: string,
    status: string,
    balance: any,
    currency: string,
    recentTransactions: any[],
    account_bank: string,
    account_bank_code: string,
    account_name: string,
    account_number: string,
}
export interface Transaction {
    reference: any,
    walletid: any,
    type: any,
    status: any,
    amount: any,
    mastpal_fee: any;
    merchant_fee: any,
    narration: any,
    created_at: any,
}

export const emptywallet:Wallet = {
    id: "",
    name: "",
    email: "",
    status: "",
    balance: "",
    currency: "",
    recentTransactions: [],
    account_bank: "",
    account_bank_code: "",
    account_name: "",
    account_number: "",
}


@Injectable({
    providedIn: 'root'
})
export class CurrentUser {
    currentUser = emptywallet;
    constructor() {}
    

    getWallet(){
        return this.currentUser;
    }
}