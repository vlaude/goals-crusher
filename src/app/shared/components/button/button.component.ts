import { Component, Input, OnInit } from '@angular/core';

type color = 'default' | 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'vl-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
// TODO bind button click to component click
export class ButtonComponent implements OnInit {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: color = 'default';
  @Input() disabled: boolean;
  @Input() icon: boolean;
  @Input() fullWidth: boolean;

  constructor() {}

  ngOnInit(): void {
    this.disabled = this.disabled !== undefined;
    this.icon = this.icon !== undefined;
    this.fullWidth = this.fullWidth !== undefined;
  }
}
