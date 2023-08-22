import { BehaviorSubject } from 'rxjs';
import { Film } from './../shared/models/film.model';
import { Injectable } from '@angular/core';

export enum Libraries {
  Watched = 'watched',
  Queued = 'queued',
}

const LOCAL_STORAGE_LIB_KEY = 'library';

const INITIAL_LIBRARY = {
  [Libraries.Watched]: [],
  [Libraries.Queued]: [],
};

export interface Library {
  [Libraries.Watched]: Film[];
  [Libraries.Queued]: Film[];
}

@Injectable({ providedIn: 'root' })
export class LibraryService {
  library$ = new BehaviorSubject<Library>(INITIAL_LIBRARY);
  library: Library = INITIAL_LIBRARY;

  fetchLibrary() {
    const library: Library =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIB_KEY)) ||
      INITIAL_LIBRARY;
    this.library = library;
    this.library$.next(library);
  }

  getFilmsFromLibrary(collection: Libraries) {
    return this.library[collection].slice();
  }

  checkIfExistInLibrary(id: number | string, collection: Libraries) {
    return this.library[collection].find((film) =>
      this.compareFilmWithId(film, id)
    );
  }

  removeFromLibrary(id: number | string, collection: Libraries) {
    const newCollection = this.library[collection].filter((film) =>
      !this.compareFilmWithId(film, id)
    );
    const newLibrary = { ...this.library, [collection]: newCollection };

    this.updateLibrary(newLibrary);
  }

  addToLibrary(film: Film, collection: Libraries) {
    const newCollection = [...this.library[collection], film];

    const newLibrary = { ...this.library, [collection]: newCollection };
    this.updateLibrary(newLibrary);
  }

  private updateLibrary(library: Library) {
    this.library = library;
    this.library$.next(library);
    localStorage.setItem(LOCAL_STORAGE_LIB_KEY, JSON.stringify(library));
  }

  private compareFilmWithId(film: Film, id: string | number) {
    return String(film.id) === String(id);
  }
}
