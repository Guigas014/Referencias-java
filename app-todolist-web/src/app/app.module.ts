import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, UserComponent, TaskComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    // CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
