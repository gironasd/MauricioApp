import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },  
  {
    path: '',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./pages/cuentas/cuentas.module').then( m => m.CuentasPageModule)
  },
  {
    path: 'cuenta/:id',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'cuenta/pagos/:id',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
