import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BusinessService } from 'src/app/services/business.service';
import { ClientService } from 'src/app/services/client.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
	selector: 'app-invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent {

	fetchingData = false;
	invoiceid:any;
	invoice:any;
	client:any;
	business:any;

	constructor(private invoiceService: InvoiceService, private clientService: ClientService, private businessService: BusinessService, private toast: HotToastService, private activatedRoute: ActivatedRoute){}

	
	ngOnInit(){
		this.activatedRoute.paramMap.subscribe(
			(data)=>{
				this.invoiceid = data.get("id");
				this.getBusiness();
				this.getinvoiceDetails();
			}
		)
	}

	getBusiness(){
		this.businessService.getBusinessDetails().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.business = data.data;
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

	getClientDetails(){
		this.clientService.getClient(this.invoice.clientreference).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.client = data.data;
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

	getinvoiceDetails(){
		this.invoiceService.getInvoice(this.invoiceid).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.invoice = data.data;
					this.getClientDetails();
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

	sharing = false
	share(){
		try {
			this.sharing = true;
			navigator.share({
				url: `https://smix.com.ng/viewinvoice/${this.invoice.reference}`,
				title: `Share invoice`
			});
			this.sharing = false;
		} catch (error) {
			this.sharing = false;
			this.toast.info("Could not share device on this device");
		}
	}
}
