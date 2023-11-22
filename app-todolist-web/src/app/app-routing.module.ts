import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'task', component: TaskComponent },
  // { path: '**', component: PageNotFoundComponent },
  // { path: 'user', component: UserComponent, outlet: 'userRoute' },
  // { path: 'task', component: TaskComponent, outlet: 'taskRoute' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
