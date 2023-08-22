import { Directive, Input, OnInit, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[poster-src]',
})
export class PosterSrcDirective implements OnInit {
  baseImgUrl = 'https://image.tmdb.org/t/p/';
  @HostBinding('src') src = '';
  @Input('poster-src') imagePath = '';

  ngOnInit() {
    this.src = this.baseImgUrl + 'w342' + this.imagePath;
  }
}
