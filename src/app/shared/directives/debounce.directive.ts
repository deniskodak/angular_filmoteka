import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[ngModel][onDebounce]',
})
export class DebounceDirective implements OnInit, OnDestroy {
  @Output()
  public onDebounce = new EventEmitter<any>();

  @Input('debounce')
  public debounceTime: number = 300;

  private isFirstChange: boolean = true;
  private subscription: Subscription;

  constructor(public model: NgControl) {}

  ngOnInit() {
    this.subscription = this.model.valueChanges
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe((modelValue) => {
        if (this.isFirstChange) {
          this.isFirstChange = false;
        } else {
          this.onDebounce.emit(modelValue);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
