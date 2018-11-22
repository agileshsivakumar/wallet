import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { CommonUtilModule } from './common-util/common-util.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    CommonUtilModule,
    DashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
