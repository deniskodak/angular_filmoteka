import { LibraryResolver } from './library.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';

export const LibraryResolverKey = 'library';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      [LibraryResolverKey]: LibraryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRouting {}
