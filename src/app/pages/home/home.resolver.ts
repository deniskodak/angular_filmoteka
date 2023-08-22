import { FilmsService, ApiResponses } from './../../core/films.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';

const MAX_POPULAR_PAGES = 500;

@Injectable({ providedIn: 'root' })
export class HomeResolver {
  constructor(private filmsService: FilmsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): void | Observable<ApiResponses['popular']> {
    const page = route.queryParams['page'] || 1;
    const search = route.queryParams['search'] || '';
    const requestMethod = search
      ? this.filmsService.searchFilms(page, search)
      : this.filmsService.fetchPopularFilms(page);
    return requestMethod.pipe(
      map((response) => {
        response.total_pages =
          response.total_pages >= MAX_POPULAR_PAGES
            ? MAX_POPULAR_PAGES
            : response.total_pages;
        return response;
      })
    );
  }
}
