import { HidePaginationDirective } from './../../shared/directives/hide-pagination.directive';
import { map, tap, switchMap } from 'rxjs';
import { FilmDetailModalComponent } from './../../features/films-list/film-detail-modal/film-detail-modal.component';
import {
  Button,
  ButtonThemes,
} from './../../shared/components/button/button.component';
import { Libraries, LibraryService } from './../../core/library.service';
import { FilmsListComponent } from 'src/app/features/films-list/films-list.component';
import { Film } from 'src/app/shared/models/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from './../../header/header.component';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { LibraryResolverData } from './library.resolver';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { LibraryResolverKey } from './library-routing.module';

interface LibraryQueryParams {
  page?: number;
  collection?: Libraries;
}

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    FilmsListComponent,
    PaginationComponent,
    Button,
    FilmDetailModalComponent,
    HidePaginationDirective,
  ],
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent implements OnInit {
  films: Film[] = [];
  page = 0;
  totalPages = 0;
  libraries = Libraries;
  currentCollection: Libraries = Libraries.Watched;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((data) => {
          const { page, totalPages, collection }: LibraryResolverData =
            data[LibraryResolverKey];
          this.currentCollection = collection;
          this.page = page;
          this.totalPages = totalPages;
          return collection;
        }),
        switchMap((collection) => {
          return this.libraryService.library$.pipe(
            map((library) => library[collection])
          );
        })
      )
      .subscribe((films) => {
        this.films = films.slice();
        this.changeDetection.detectChanges()
      });
  }

  onChangeCollection(collection: Libraries) {
    this.setPopularQueryParams({
      collection,
    });
  }

  onPaginate(page: number) {
    this.setPopularQueryParams({ page });
  }

  private setPopularQueryParams(queryParams: LibraryQueryParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams,
    });
    this.changeDetection.detectChanges();
  }

  getButtonTheme(collection: Libraries) {
    return this.currentCollection === collection
      ? ButtonThemes.Accent
      : ButtonThemes.LightAccent;
  }
}
