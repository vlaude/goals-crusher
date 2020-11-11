import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vl-send-reset-password-request-modal',
  templateUrl: './send-reset-password-request-modal.component.html',
  styleUrls: ['./send-reset-password-request-modal.component.scss'],
})
export class SendResetPasswordRequestModalComponent implements OnInit {
  @Output() cancelClicked = new EventEmitter<void>();
  @Output() sendRequestClicked = new EventEmitter<string>();
  @Output() submitted = new EventEmitter<void>();

  @Input() id = 'send-reset-password-request-modal';

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {}

  submitForm(): void {
    const email = this.form.controls.email.value;
    this.sendRequestClicked.emit(email);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
}
