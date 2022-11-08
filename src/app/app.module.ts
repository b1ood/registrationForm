import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrivacyComponent} from './components/privacy/privacy.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {HttpClientModule} from "@angular/common/http";
import {RegFormComponent} from './components/reg-form/reg-form.component';
import {ColorizeDirective} from './directives/colorize.directive';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {UserService} from "./components/login-form/userServise/user.service";
import {UserPageService} from "./components/user-page/userPageService/userPage.service";
import {UserPageModule} from "./components/user-page/user-page.module";

const appRoutes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'registration', component: RegFormComponent},
  {path: 'page', component: UserPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PrivacyComponent,
    LoginFormComponent,
    RegFormComponent,
    ColorizeDirective,
    PreloaderComponent,
    UserPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    UserPageModule
  ],
  providers: [UserService, UserPageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
