import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'vl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'file' = 'text';
  @Input() placeholder = '';
  @Input() required: boolean;
  @Input() width = '100%';
  @Input() disabled: boolean;
  @Input() accept: string;

  value = '';

  constructor(
    @Self()
    @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.required = this.required !== undefined;
    this.disabled = this.disabled !== undefined;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: any = () => {};
  onTouched: any = () => {};
}
