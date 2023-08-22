import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export enum ButtonThemes {
  Dark = 'dark',
  Light = 'light',
  Accent = 'accent',
  LightAccent = 'light accent',
}

@Component({
  standalone: true,
  styleUrls: ['./button.component.scss'],
  templateUrl: './button.component.html',
  selector: 'app-button',
  imports: [UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @Input() title: string = '';
  @Input() buttonTheme: ButtonThemes = ButtonThemes.Light;
  @Output() onClick = new EventEmitter<HTMLButtonElement>();

  onButtonClick() {
    this.onClick.emit();
  }
}
