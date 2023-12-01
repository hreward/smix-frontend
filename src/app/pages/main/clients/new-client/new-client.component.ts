import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ClientService } from 'src/app/services/client.service';

@Component({
	selector: 'app-new-client',
	templateUrl: './new-client.component.html',
	styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent {

	fetchingData = false;
	avatarUrl = '';

	constructor(private clientService: ClientService, private toast:HotToastService, private router: Router){}

	submit(f:NgForm){
		if(f.invalid) return;
		this.clientService.newClient(f.value).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.toast.info(data.message, {id:"loginmsg", dismissible:true, autoClose:true, duration: 7000});
                    this.router.navigate([`/client-details/${data.data.id}`]);
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

	avatarUpload(event: any): void {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
		  	this.avatarUrl = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}
}
