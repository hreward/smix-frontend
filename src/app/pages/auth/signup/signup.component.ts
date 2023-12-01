import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

	fetchingData = false;
    banks:any = [];
    accountName = 'Waiting for input'

	constructor(private authService: AuthService, private toast: HotToastService, private router: Router){}

    ngOnInit(){
        this.getBanks();
    }

	submit(f:NgForm){
		if(f.invalid) return;
		this.authService.signup(f.value).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.toast.info(data.message, {id:"signupmsg", dismissible:true, autoClose:true, duration: 7000});
					localStorage.setItem("signupemail", f.value['email']);
                    // this.router.navigate(["/verify-code"]);
                    this.router.navigate(["/login"]);
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
	getBanks(){
		this.authService.getBanks().subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.banks = data.data;
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
	resolveAccount(f:NgForm){
        if(f.value['accountnumber'].length < 10 || f.value['bankcode'] === ''){
            return;
        }
		this.authService.resolveAccount({accountnumber: f.value['accountnumber'], bankcode: f.value['bankcode']}).subscribe({
            next: (data:any) => {
                this.fetchingData = false;
                if(data.status && data.success){
                    this.accountName = data.data;
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
                    this.accountName = error.error.message;
                    this.toast.error(error.error.message, {id:"errmsg", autoClose:true});
                }
            }
		})
	}
}
