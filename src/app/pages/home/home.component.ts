import { FilmDetailModalComponent } from './../../features/films-list/film-detail-modal/film-detail-modal.component';
import { HeaderComponent } from './../../header/header.component';
import { FilmsListComponent } from 'src/app/features/films-list/films-list.component';
import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { ApiResponses } from 'src/app/core/films.service';
import { Film } from 'src/app/shared/models/film.model';
import { HomeResolverKey } from './home-routing.module';
import { HidePaginationDirective } from 'src/app/shared/directives/hide-pagination.directive';

interface PopularQueryParams {
  page?: number;
  search?: string;
}

@Component({
  standalone: true,
  imports: [
    FilmsListComponent,
    HeaderComponent,
    PaginationComponent,
    FilmDetailModalComponent,
    HidePaginationDirective,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  page: number = 1;
  totalPages: number = 0;
  search: string = '';
  films: Film[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => {
          const popularResponse: ApiResponses['popular'] =
            data[HomeResolverKey];
          return popularResponse;
        }),
        tap((popularResponse) => {
          this.page = popularResponse.page;
          this.totalPages = popularResponse.total_pages;
          this.films = popularResponse.results;
        }),
        switchMap(() => this.route.queryParams)
      )
      .subscribe((queryParams) => {
        this.search = queryParams['search'] || '';
      });
  }

  onSearch(search: string) {
    this.setPopularQueryParams({ search, page: 1 });
  }

  onPaginate(page: number) {
    this.setPopularQueryParams({ page });
  }

  private setPopularQueryParams(queryParams: PopularQueryParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams,
    });
  }
}
