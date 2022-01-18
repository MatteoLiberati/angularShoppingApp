import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';



@NgModule({
  declarations: [
    DropdownDirective,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule { }
