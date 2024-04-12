import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BdsAllComponent } from './data/bdsAll/bdsAll.component';
import { BdsDetailComponent } from './data/bdsDetail/bdsDetail.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AutoAllComponent } from './data/autoAll/autoAll.component';
import { AutoDetailComponent } from './data/autoDetail/autoDetail.component';

const routes: Routes = [
  {
    path: 'config', canActivate: [AuthGuard],
    component: ConfigurationComponent
  },
  {
    path: 'accounts', canActivate: [AuthGuard],
    component: AccountsComponent
  },
  {
    path: 'home', canActivate: [AuthGuard],
    component: BdsAllComponent
  },
  {
    path: 'bds', canActivate: [AuthGuard],
    component: BdsAllComponent
  },
  {
    path: 'bds/:id', canActivate: [AuthGuard],
    component: BdsDetailComponent
  },
  {
    path: 'auto', canActivate: [AuthGuard],
    component: AutoAllComponent
  },
  {
    path: 'auto/:id', canActivate: [AuthGuard],
    component: AutoDetailComponent
  },
  {
    path: 'changePassword',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }