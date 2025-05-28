import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ServiceComponent } from './pages/services-memory/services-memory.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DeceasedComponent } from './pages/deceased/deceased.component';
import { PlansComponent } from './pages/plans/plans.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { CertificateComponent } from './pages/certificate/certificate.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { TransferStandardComponent } from './pages/transfer-standard/transfer-standard.component';
import { SolicitudSinPlanComponent } from './pages/solicitud-sin-plan/solicitud-sin-plan.component';

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
    },
    { 
        path:'deceased',
        component:DeceasedComponent
    },
    { 
        path: 'plans/:planId/members',
        component: DeceasedComponent 
    },
    { 
        path:'plans',
        component:PlansComponent
    },
    { 
        path:'confirm',
        component:ConfirmComponent
    },
    { 
        path:'certificate',
        component:CertificateComponent
    },
    {
        path:'payments',
        component:PaymentsComponent
    },
    {
        path:'transfer',
        component:TransferComponent
    },
    {
        path:'transfer-standar',
        component:TransferStandardComponent
    
    },
    {
        path:'solicitud-sin-plan',
        component:SolicitudSinPlanComponent
    
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch: 'full'
    }

];


