import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vl-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() id: string;
  @Input() title = 'Confirm';
  @Input() text = 'Are you sure you wanna do this ?';
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'No';

  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
