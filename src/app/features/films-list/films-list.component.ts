import { FilmsItemComponent } from './films-item/films-item.component';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Film } from 'src/app/shared/models/film.model';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgFor, FilmsItemComponent],
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent {
  @Input() films: Film[] = [];
}
