import { Film } from './../../../shared/models/film.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetailModalService {
  film = new Subject<Film>();

  openModal(film: Film) {
    this.film.next(film);
  }

  closeModal() {
    this.film.next(null);
  }
}
