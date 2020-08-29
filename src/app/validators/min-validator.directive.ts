import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[appMinNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective implements Validator {
  @Input('appMinNumber') min: number;

  validate(c: FormControl): { [key: string]: any } | null {
    const v = c.value;
    return v !== null && (v < this.min) ? {min: true} : null;
  }
}
