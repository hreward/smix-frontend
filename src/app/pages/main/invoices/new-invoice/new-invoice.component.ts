import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ClientService } from 'src/app/services/client.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
	selector: 'app-new-invoice',
	templateUrl: './new-invoice.component.html',
	styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent {

	invoice = {
		clientid: '',
		duedate: '',
		currency: '',
		items: [
			{
				description: '',
				quantity: 0,
				rate: 0
			}
		]
	};
	emptyItem = {
		description: "",
		quantity: 0,
		rate: 0
	}

	invoiceTotal = 0;
	fetchingData = false;
	clients:any = [];

	constructor(private invoiceService: InvoiceService, private clientService: ClientService, private toast: HotToastService, private router: Router){}
	
	ngOnInit(){
		this.getClients();
	}

	getClients(){
		this.clientService.getClients().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
					this.clients = data.data;
					this.clients.filter((client:any)=>{
						client.status == 'active';
					});
                } else {
                    this.toast.error(data.message, {id:"errmsg"});
                }
            },
            error: (error:any) => {
                this.fetchingData = false;
				console.log(typeof(error.error.error))
                if(error.error instanceof ProgressEvent){
                    this.toast.error("Check internet connection", {id:"errmsg", autoClose:true});
                } else if(typeof(error.error.error) == 'string'){
                    this.toast.error("You seem logged out. Please login.", {id:"errmsg", autoClose:true});
                } else {
                    this.toast.error(error.error.message, {id:"errmsg", autoClose:true});
                }
            }
		})
	}

	addItem(){
		this.invoice.items.push(Object.create(this.emptyItem));
	}
	removeItem(index:number){
		this.invoice.items.splice(index, 1);
	}

	calculateInvoice(){
		this.invoiceTotal = 0;
		this.invoice.items.forEach((item)=>{
			this.invoiceTotal += item.rate*item.quantity;
		})
	}

	submit(){
		this.invoiceService.newInvoice(this.invoice).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
					this.router.navigateByUrl(`/invoice-details/${data.data.reference}`);
                } else {
                    this.toast.error(data.message, {id:"errmsg"});
                }
            },
            error: (error:any) => {
                this.fetchingData = false;
				console.log(typeof(error.error.error))
                if(error.error instanceof ProgressEvent){
                    this.toast.error("Check internet connection", {id:"errmsg", autoClose:true});
                } else if(typeof(error.error.error) == 'string'){
                    this.toast.error("You seem logged out. Please login.", {id:"errmsg", autoClose:true});
                } else {
                    this.toast.error(error.error.message, {id:"errmsg", autoClose:true});
                }
            }
		});
	}
}
