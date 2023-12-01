import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	fetchingData = false;
	transactions:any;
	revenue = 0;

	constructor(private transactionService: TransactionService, private analyticsService:AnalyticsService, private toast: HotToastService){}

	ngOnInit(){
		this.getTransactions();
	}

	
	getTransactions(){
		this.transactionService.getTransactions().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
					this.transactions = data.data;
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
                    console.log("Errrrorr", error)
                    this.toast.error(error.error.message, {id:"errmsg", autoClose:true});
                }
            }
		})
	}

	getAnalytics(){
		this.analyticsService.getRevenue().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
					this.revenue = data.data;
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
}
