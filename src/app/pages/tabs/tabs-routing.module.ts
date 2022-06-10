import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'cuentas',
        loadChildren: () => 
        import('../cuentas/cuentas.module').then( m => m.CuentasPageModule)
      },
      {
        path: 'historial',
        loadChildren: () => 
        import('../historial/historial.module').then( m => m.HistorialPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
