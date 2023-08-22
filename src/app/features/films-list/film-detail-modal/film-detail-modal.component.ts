import { LibraryService, Libraries } from './../../../core/library.service';
import {
  Button,
  ButtonThemes,
} from './../../../shared/components/button/button.component';
import { NgIf, UpperCasePipe, NgOptimizedImage, NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { GenrePipe } from './../../../shared/pipes/genre.pipe';
import { Film } from './../../../shared/models/film.model';
import { DetailModalService } from './detail-modal.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PosterSrcDirective } from 'src/app/shared/directives/poster-source.directive';

@Component({
  standalone: true,
  imports: [
    ModalComponent,
    GenrePipe,
    NgIf,
    UpperCasePipe,
    NgOptimizedImage,
    PosterSrcDirective,
    Button,
    NgFor,
  ],
  selector: 'app-film-detail-modal',
  templateUrl: './film-detail-modal.component.html',
  styleUrls: ['./film-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailModalComponent implements OnInit, OnDestroy {
  film: Film = null;
  filmSb: Subscription;
  isWatched: boolean;
  isQueued: boolean;
  librariesTypes = Libraries;
  buttonThemes = ButtonThemes;

  constructor(
    private detailModalService: DetailModalService,
    private libraryService: LibraryService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filmSb = this.detailModalService.film.subscribe((film) => {
      this.film = film;
      if(!film) return
      
      this.isQueued = !!this.libraryService.checkIfExistInLibrary(
        film.id,
        Libraries.Queued
      );

      this.isWatched = !!this.libraryService.checkIfExistInLibrary(
        film.id,
        Libraries.Watched
      );

      this.changeDetection.detectChanges()
    });
  }

  onCloseModal() {
    this.detailModalService.closeModal();
  }

  ngOnDestroy(): void {
    this.filmSb.unsubscribe();
  }

  onLibraryButtonClick(collection: Libraries) {
    const isInLibrary =
      collection === Libraries.Watched ? this.isWatched : this.isQueued;
    if (isInLibrary) {
      this.libraryService.removeFromLibrary(this.film.id, collection);
    } else {
      this.libraryService.addToLibrary(this.film, collection);
    }
    this.switchIsInLibraryProperty(isInLibrary, collection);
  }

  private switchIsInLibraryProperty(prevValue, collection) {
    switch (collection) {
      case Libraries.Watched:
        this.isWatched = !prevValue;
        break;
      default:
        this.isQueued = !prevValue;
    }
  }
}
