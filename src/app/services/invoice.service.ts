import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

const API_BASE = isDevMode()? "http://localhost:8000/" : "https://api.smix.com.ng/";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    fetchingData = false;

    constructor(private http: HttpClient) {}

    getInvoice(invoiceid:string){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.get<any>(API_BASE + `invoice/${invoiceid}`, {headers});
    }

    getInvoices(){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };

        return this.http.get<any>(API_BASE + "invoice/", {headers});
    }

    newInvoice(invoice:any){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.post<any>(API_BASE + "invoice/new", invoice, {headers});
    }

    deleteInvoice(invoiceid:string){
        let authtoken=localStorage.getItem("cauthtoken") || "";
        const headers = { 'Authorization': authtoken };
        
        return this.http.delete<any>(API_BASE + `invoice/${invoiceid}`, {headers});
    }
}
