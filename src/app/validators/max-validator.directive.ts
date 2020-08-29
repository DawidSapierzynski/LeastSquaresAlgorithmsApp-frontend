import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[appMaxNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective {
  @Input('appMaxNumber') max: number;

  validate(c: FormControl): { [key: string]: any } | null {
    const v = c.value;
    return v !== null && (v > this.max) ? {max: true} : null;
  }

}
