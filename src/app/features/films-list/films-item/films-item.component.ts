import { DetailModalService } from './../film-detail-modal/detail-modal.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Film } from './../../../shared/models/film.model';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GenrePipe } from 'src/app/shared/pipes/genre.pipe';

@Component({
  standalone: true,
  imports: [UpperCasePipe, DatePipe, GenrePipe],
  selector: 'app-films-item',
  templateUrl: './films-item.component.html',
  styleUrls: ['./films-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsItemComponent {
  @Input() film: Film;
  baseImgUrl = 'https://image.tmdb.org/t/p/';

  constructor(private detailModalService: DetailModalService) {}

  onFilmClick() {
    this.detailModalService.openModal(this.film);
  }
}
