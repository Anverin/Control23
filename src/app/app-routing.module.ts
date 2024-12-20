import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)},
      {path: 'order', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)},
      {path: 'catalogue', loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)},
    ]
  },
  {path: '**', redirectTo: ''} //редирект на главную, такая строка д.б. самой последней
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
