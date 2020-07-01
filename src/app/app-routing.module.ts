import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'juthapp',
    children: [
      {
        path: 'friends',
        children:[
          {
            path: '',
            loadChildren: () => import('./friends/friends.module').then( m => m.FriendsModule)
          }
        ]
      },
      {
        path: 'gigamarket',
        children: [
          {
            path: 'info',
            loadChildren: () => import('./market/info/info.module').then( m => m.InfoPageModule)
          },
          {
            path: 'buy',
            loadChildren: () => import('./market/buy/buy.module').then( m => m.BuyPageModule)
          },
          {
            path: '',
            loadChildren: () => import('./market/gigamarket/gigamarket.module').then( m => m.GigamarketModule)
          }
        ]
      },
      {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
