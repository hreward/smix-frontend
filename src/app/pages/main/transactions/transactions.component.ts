import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
	fetchingData = false;
	transactions:any;

	constructor(private transactionService: TransactionService, private toast: HotToastService){}

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
