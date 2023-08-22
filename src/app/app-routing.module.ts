import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren() {
      return import('./pages/home/home-routing.module').then(
        (module) => module.HomeRouting
      );
    },
  },
  {
    path: 'library',
    loadChildren() {
      return import('./pages/library/library-routing.module').then(
        (module) => module.LibraryRouting
      );
    },
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule, HttpClientModule],
})
export class AppRoutingModule {}
