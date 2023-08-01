import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { FileOpener } from '@ionic-native/file-opener/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/auth/login/login.module';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { CuentaPage } from './pages/cuenta/cuenta.page';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    LoginPageModule,
    TabsPageModule,
    HttpClientModule
    
  ],
  providers: 
  [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   //FileOpener
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
