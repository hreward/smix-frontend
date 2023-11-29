import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, emptyuser } from '../interfaces/user';
import { Wallet, emptywallet } from '../interfaces/wallet';

@Injectable({
	providedIn: 'root'
})
export class GlobalDataService {
	title:BehaviorSubject<string>;
	sideBarOpen:BehaviorSubject<boolean>;
	thisUser:BehaviorSubject<User>;
	userWallet:BehaviorSubject<Wallet>;
	isLogin:BehaviorSubject<boolean>;
	adminMode:BehaviorSubject<boolean>;
	
	constructor() {
		this.title = new BehaviorSubject<string>("");
		this.sideBarOpen = new BehaviorSubject<boolean>(false);
		this.thisUser = new BehaviorSubject<User>(emptyuser);
		this.userWallet = new BehaviorSubject<Wallet>(emptywallet);
		this.isLogin = new BehaviorSubject<boolean>(false);
		this.adminMode = new BehaviorSubject<boolean>(false);
		if(localStorage.getItem("cauthtoken") === null || localStorage.getItem("cauthtoken") === "" ){
			this.isLogin = new BehaviorSubject<boolean>(false);
		} else {
			this.isLogin = new BehaviorSubject<boolean>(true);
		}
	}


	setTitle(title:string){
		this.title.next(title);
	}
	getTitle(): Observable<string> {
		return this.title.asObservable();
	}

	//side bar handling
	openSidebar(state:boolean){
		this.sideBarOpen.next(state);

		const body = document.getElementsByTagName('body')[0];
		if(state == true){
			body.classList.add('menu-open');
		} else {
			body.classList.remove('menu-open');
		}
	}
	getSideBarState(): Observable<boolean> {
		return this.sideBarOpen.asObservable();
	}
}
