import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
	selector: 'app-invoices',
	templateUrl: './invoices.component.html',
	styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {

	fetchingData = false;
	invoices:any;

	constructor(private invoiceService: InvoiceService, private toast: HotToastService){}

	ngOnInit(){
		this.getInvoices();
	}

	
	getInvoices(){
		this.invoiceService.getInvoices().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
					this.invoices = data.data;
                } else {
                    this.toast.error(data.message, {id:"errmsg"});
                }
            },
            error: (error:any) => {
                this.fetchingData = false;
				console.log(typeof(error.error.error))
                if(error.error.error instanceof ProgressEvent){
                    this.toast.error("Check internet connection", {id:"errmsg", autoClose:true});
                } else if(typeof(error.error.error) == 'string'){
                    this.toast.error("You seem logged out. Please login.", {id:"errmsg", autoClose:true});
                } else {
                    this.toast.error(error.error.message, {id:"errmsg", autoClose:true});
                }
            }
		})
	}
}
