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
import { NewInvoiceComponent } from './pages/main/invoices/new-invoice/new-invoice.component';
import { InvoiceDetailsComponent } from './pages/main/invoices/invoice-details/invoice-details.component';
import { ViewInvoiceComponent } from './pages/public/view-invoice/view-invoice.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { LandingPageComponent } from './pages/public/landing-page/landing-page.component';

const routes: Routes = [
	// { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'resetpassword', component: ResetpasswordComponent },
	{ path: 'verify-code', component: VerifycodeComponent },
	{ path: 'view-invoice/:id', component: ViewInvoiceComponent },
	{ path: 'welcome', component: LandingPageComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{
		path: '', component: MainComponent, canActivate: [AuthguardGuard],
		children: [
			{ path: 'home', component: DashboardComponent },
			{ path: 'dashboard', component: DashboardComponent },

			{ path: 'invoices', component: InvoicesComponent },
			{ path: 'newinvoice', component: NewInvoiceComponent },
			{ path: 'invoice-details/:id', component: InvoiceDetailsComponent },

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
