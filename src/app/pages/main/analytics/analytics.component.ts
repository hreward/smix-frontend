import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { BusinessService } from 'src/app/services/business.service';

@Component({
	selector: 'app-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

	fetchingData = false;
	business:any;
	clients:any;
	totalrevenue = 0;
	newclients = 0;
	debtors = 0;
	noOfInvoices = 0;
	constructor(private analyticsService: AnalyticsService, private businessService: BusinessService, private toast: HotToastService){}

	ngOnInit(){
		this.getAnalytics();
	}

	getAnalytics(){
		this.analyticsService.getAnalytics().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
					this.totalrevenue = data.data.totalrevenue;
					this.newclients = data.data.newclients;
					this.debtors = data.data.debtors;
					this.noOfInvoices = data.data.noOfInvoices;
					this.clients = data.data.topClients;
                } else {
                    this.toast.error(data.message, {id:"errmsg"});
                }
            },
            error: (error:any) => {
                this.fetchingData = false;
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
}
