import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';

const initialPaginationConfig = {
  totalPages: 0,
  filmsAmount: 0,
};

@Directive({
  standalone: true,
  selector: '[hide-pagination]',
})
export class HidePaginationDirective implements OnInit {
  @Input('hide-pagination') paginationConfig = initialPaginationConfig;

  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<PaginationComponent>
  ) {}

  ngOnInit() {
    if (
      this.paginationConfig.totalPages > 1 &&
      this.paginationConfig.filmsAmount >= 20
    ) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
}
