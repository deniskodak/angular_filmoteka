import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [NgIf],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() title: string = '';
  @Output() onClose = new EventEmitter();
  @Input() shown: boolean = false;
  @ViewChild('backdrop') backdropEl: ElementRef = null;

  onBackdropClick(event: MouseEvent) {
    if (event.target === this.backdropEl.nativeElement) {
      this.onClose.emit();
    }
  }
}
