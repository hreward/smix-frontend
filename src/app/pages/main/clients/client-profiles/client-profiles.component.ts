import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ClientService } from 'src/app/services/client.service';

@Component({
	selector: 'app-client-profiles',
	templateUrl: './client-profiles.component.html',
	styleUrls: ['./client-profiles.component.scss']
})
export class ClientProfilesComponent {

	fetchingData = false;
	activeCount = 0;
	pastCount = 0;
	allClients = [];
	clients:any = [];

	constructor(private clientService: ClientService, private toast: HotToastService){}

	ngOnInit(){
		this.getClients();
	}

	getClients(){
		this.clientService.getClients().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
					this.allClients = data.data;
					this.filter('active');

					// count diff categories
					this.allClients.map((client:any)=>{
						if(client.status == "active"){
							this.activeCount++;
						} else if(client.status == "deleted"){
							this.pastCount++;
						}
					});
                } else {
                    this.toast.error(data.message, {id:"errmsg"});
                }
            },
            error: (error:any) => {
                this.fetchingData = false;
                if(error.error instanceof ProgressEvent){
                    this.toast.error("Check internet connection", {id:"errmsg", autoClose:true});
                } else {
                    this.toast.error(error.error.message, {id:"errmsg", autoClose:true});
                }
            }
		})
	}

	filter(criteria: string){
		this.clients = [];
		if(criteria === ''){
			this.clients = this.allClients;
			return;
		}
		this.allClients.map((client:any)=>{
			if(client.status === criteria){
				this.clients.push(client)
			}
		});
	}

}
