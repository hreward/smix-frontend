import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { InvoicesComponent } from './pages/main/invoices/invoices.component';
import { ClientProfilesComponent } from './pages/main/clients/client-profiles/client-profiles.component';
import { TransactionsComponent } from './pages/main/transactions/transactions.component';
import { AnalyticsComponent } from './pages/main/analytics/analytics.component';
import { CustomerSupportComponent } from './pages/main/customer-support/customer-support.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ResetpasswordComponent } from './pages/auth/resetpassword/resetpassword.component';
import { VerifycodeComponent } from './pages/auth/verifycode/verifycode.component';
import { ClientDetailsComponent } from './pages/main/clients/client-details/client-details.component';
import { NewClientComponent } from './pages/main/clients/new-client/new-client.component';

const routes: Routes = [
	// { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'resetpassword', component: ResetpasswordComponent },
	{ path: 'verify-code', component: VerifycodeComponent },
	{
		path: '', component: MainComponent,
		children: [
			{ path: 'home', component: DashboardComponent },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'invoices', component: InvoicesComponent },

			{ path: 'client-profiles', component: ClientProfilesComponent },
			{ path: 'newclient', component: NewClientComponent },
			{ path: 'client-details/:id', component: ClientDetailsComponent },

			{ path: 'transactions', component: TransactionsComponent },
			{ path: 'analytics', component: AnalyticsComponent },
			{ path: 'customer-support', component: CustomerSupportComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
