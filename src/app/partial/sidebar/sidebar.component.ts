import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

	fetchingData = false;
    business:any;

	constructor(private authService: AuthService, private businessService: BusinessService, private toast: HotToastService, private router: Router){}

    ngOnInit(){
        this.getBusiness();
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


	logout(){
		this.authService.logout().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.toast.info(data.message, {id:"signupmsg", dismissible:true, autoClose:true, duration: 7000});
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
		});
		localStorage.removeItem('cauthtoken');
		this.router.navigate(["/login"]);
	}

    
	//closes sidebar on external(outside click)
	@HostListener('document:click', ['$event'])
	sideBarClose(event:Event){
		
		let sideBar = document.getElementById('sidebar');
		let sideBarBtn = document.getElementById('openmenu');
		let source:HTMLElement = <HTMLElement>event.target;
		if(source == (sideBarBtn) || sideBarBtn?.contains(source)){
			event.preventDefault();
		} else if (!sideBar?.contains(source)){
			event.preventDefault();
            sideBar?.classList.remove('active');
        }
	}

    closeSidebar(){
        let sideBar = document.getElementById('sidebar');
        sideBar?.classList.remove('active');
    }
}
