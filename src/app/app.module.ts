import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { SidebarComponent } from './partial/sidebar/sidebar.component';
import { FooterComponent } from './partial/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ResetpasswordComponent } from './pages/auth/resetpassword/resetpassword.component';
import { VerifycodeComponent } from './pages/auth/verifycode/verifycode.component';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { ClientProfilesComponent } from './pages/main/clients/client-profiles/client-profiles.component';
import { InvoicesComponent } from './pages/main/invoices/invoices.component';
import { TransactionsComponent } from './pages/main/transactions/transactions.component';
import { AnalyticsComponent } from './pages/main/analytics/analytics.component';
import { CustomerSupportComponent } from './pages/main/customer-support/customer-support.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { ClientDetailsComponent } from './pages/main/clients/client-details/client-details.component';
import { NewClientComponent } from './pages/main/clients/new-client/new-client.component';
import { NewInvoiceComponent } from './pages/main/invoices/new-invoice/new-invoice.component';
import { InvoiceDetailsComponent } from './pages/main/invoices/invoice-details/invoice-details.component';
import { ViewInvoiceComponent } from './pages/public/view-invoice/view-invoice.component';
import { LandingPageComponent } from './pages/public/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ResetpasswordComponent,
    VerifycodeComponent,
    DashboardComponent,
    ClientProfilesComponent,
    InvoicesComponent,
    TransactionsComponent,
    AnalyticsComponent,
    CustomerSupportComponent,
    ClientDetailsComponent,
    NewClientComponent,
    NewInvoiceComponent,
    InvoiceDetailsComponent,
    ViewInvoiceComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
		HotToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
