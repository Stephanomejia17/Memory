import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ServiceComponent } from './pages/services-memory/services-memory.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'sign-up',
        component:SignUpComponent
    },
    {
        path:'profile',
        component:ProfileComponent
    },
    {
        path:'profile-edit',
        component:ProfileEditComponent
    },
    { 
        path:'services-memory',
        component:ServiceComponent
    }

];
