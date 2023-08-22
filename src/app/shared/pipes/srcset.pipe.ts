import { FilmsService } from './../../core/films.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'genre',
})
export class SrcsetPipe implements PipeTransform {
  constructor(private filmsService: FilmsService) {}

  transform(value: number[], genreLength = 5) {
    const allGenres = this.filmsService.genres;
    const transformedGenres = value.map(
      (genreId) => allGenres[genreId] || 'Unknown'
    );
    return transformedGenres.splice(0, genreLength).join(', ');
  }
}