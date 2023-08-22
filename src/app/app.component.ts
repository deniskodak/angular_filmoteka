import { LibraryService } from './core/library.service';
import { FilmsService } from './core/films.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private filmService: FilmsService,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.filmService.fetchGenres().subscribe(({ genres }) => {
      this.filmService.setGenres(genres);
    });

    this.libraryService.fetchLibrary();
  }
}
