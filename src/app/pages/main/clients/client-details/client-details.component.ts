import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ClientService } from 'src/app/services/client.service';

@Component({
	selector: 'app-client-details',
	templateUrl: './client-details.component.html',
	styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent {

	clientid: any;
	fetchingData = false;
	client:any;

	constructor(private activatedRoute: ActivatedRoute, private clientService: ClientService, private toast:HotToastService, private router: Router){}


	ngOnInit(){
		this.activatedRoute.paramMap.subscribe(
			(data)=>{
				this.clientid = data.get("id");
				this.getClientDetails();
			}
		)
	}

	getClientDetails(){
		this.clientService.getClient(this.clientid).subscribe({
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

	deleteClient(){
		this.clientService.deleteClient(this.clientid).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.toast.info(data.message, {id:"msg"});
					this.router.navigateByUrl('/client-profiles')
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

	restoreClient(){
		this.clientService.restoreClient(this.clientid).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.toast.success(data.message, {id:"msg"});
					this.router.navigateByUrl('/client-profiles')
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
