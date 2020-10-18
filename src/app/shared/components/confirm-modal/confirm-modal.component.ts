import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vl-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() id: string;
  @Input() title: string = 'Confirm';
  @Input() text: string = 'Are you sure you wanna do this ?';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'No';

  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
