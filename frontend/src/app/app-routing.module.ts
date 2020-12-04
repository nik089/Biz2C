import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {path:'', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'homepage', component:HomepageComponent,canActivate: [AuthGuard],},
  {path:'createuser', component:NewuserComponent},
  {path:'createuser/:cid', component:NewuserComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
