import { appRoutes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

import {NgxGalleryModule } from 'ngx-gallery';

import { RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import {AuthModule} from './auth/auth.module';
import { AuthHttp, AUTH_PROVIDERS} from 'angular2-jwt/angular2-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

import {TabsModule} from 'ngx-bootstrap';
import { MemberDetailResolver } from './_resolvers/member-detail-resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      AuthModule,
      TabsModule.forRoot(),
      NgxGalleryModule 


   ],
   providers: [
       AuthGuard,
     AUTH_PROVIDERS,
     MemberDetailResolver,
     MemberListResolver
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
