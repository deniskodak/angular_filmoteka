import { Router, RouterModule } from '@angular/router';
import {
  Button,
  ButtonThemes,
} from './../shared/components/button/button.component';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebounceDirective } from '../shared/directives/debounce.directive';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-animation.component.scss'],
  imports: [Button, NgIf, FormsModule, DebounceDirective, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  buttonThemes = ButtonThemes;
  @Input() isSearchShown: boolean = true;
  search: string = '';
  @Output() onSearch = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  onSearchChanged() {
    this.onSearch.emit(this.search);
  }

  onButtonClick(url: string) {
    this.router.navigate([url]);
  }
}
