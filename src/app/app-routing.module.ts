import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BdsAllComponent } from './data/bdsAll/bdsAll.component';
import { BdsDetailComponent } from './data/bdsDetail/bdsDetail.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AutoAllComponent } from './data/autoAll/autoAll.component';
import { AutoDetailComponent } from './data/autoDetail/autoDetail.component';
import { CategoriesComponent } from './categories/categories.component';
import { StockAllComponent } from './data/stockAll/stockAll.component';

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
    path: 'categories', canActivate: [AuthGuard],
    component: CategoriesComponent
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
    path: 'stock', canActivate: [AuthGuard],
    component: StockAllComponent
  },
  {
    path: 'changePassword',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LandingComponent
  },
  {
    path: '**',
    redirectTo: '/bds'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }