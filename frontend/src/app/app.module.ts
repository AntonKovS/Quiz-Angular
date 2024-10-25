import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {MainComponent} from './views/main/main.component';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./core/auth/auth.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpClientModule,
        MatSnackBarModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}      //multi: true , чтобы interceptor добавился к существующему
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
