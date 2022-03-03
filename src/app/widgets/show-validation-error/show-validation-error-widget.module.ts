import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowErrorDirective } from './directives/show-error.directive';

@NgModule({
  declarations: [ShowErrorDirective],
  exports: [ShowErrorDirective],
  imports: [CommonModule],
})
export class ShowValidationErrorWidgetModule {}
