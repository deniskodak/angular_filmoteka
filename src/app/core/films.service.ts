import { Film } from './../shared/models/film.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

const API_URL = {
  getPopular: 'https://api.themoviedb.org/3/movie/popular',
  getGenres: 'https://api.themoviedb.org/3/genre/movie/list',
  searchFilms: 'https://api.themoviedb.org/3/search/movie',
};

export interface ApiResponses {
  popular: { results: Film[]; page: number; total_pages: number };
  genres: { genres: Genre[] };
}

interface Genre {
  id: number;
  name: string;
}

interface MappedGenre {
  [key: number]: string;
}

interface ErrorResponse {
  status_code: number;
  status_message: string;
  success: false;
}

@Injectable({ providedIn: 'root' })
export class FilmsService {
  films = new BehaviorSubject<Film[] | null>(null);
  _genres: MappedGenre = {};

  constructor(private http: HttpClient) {}

  fetchPopularFilms(page = 1) {
    return this.http.get<ApiResponses['popular']>(API_URL.getPopular, {
      params: new HttpParams().set('page', page),
    });
  }

  searchFilms(page = 1, search = '') {
    return this.http.get<ApiResponses['popular']>(API_URL.searchFilms, {
      params: new HttpParams().set('page', page).set('query', search),
    });
  }

  fetchGenres() {
    return this.http.get<ApiResponses['genres']>(API_URL.getGenres);
  }

  setGenres(genres: Genre[]) {
    this._genres = genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as MappedGenre);
  }

  get genres() {
    return { ...this._genres };
  }
}
