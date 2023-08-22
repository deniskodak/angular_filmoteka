import { LibraryService, Libraries } from './../../core/library.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Film } from 'src/app/shared/models/film.model';

export interface LibraryResolverData {
  films: Film[];
  page: number;
  totalPages: number;
  collection: Libraries;
}

@Injectable({ providedIn: 'root' })
export class LibraryResolver {
  constructor(private libraryService: LibraryService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): void | Observable<LibraryResolverData> {
    const collection: Libraries =
      route.queryParams['collection'] || Libraries.Watched;
    const page: Libraries = route.queryParams['page'] || 0;

    return this.libraryService.library$.pipe(
      map((library) => {
        const filmsCollection = library[collection];

        return {
          films: filmsCollection,
          totalPages: filmsCollection.length / 20,
          page: +page,
          collection,
        };
      })
    );
  }
}
