import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioButtonItem } from '../../shared/components/radio-button/radio-button.component';
import { GoalModel } from '../../core/models/goal.model';

@Component({
  selector: 'vl-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent implements OnInit, OnChanges {
  @Input() goal: GoalModel<any>;
  @Output() formSubmitted = new EventEmitter<FormGroup>();
  @Output() cancelBtnClicked = new EventEmitter<void>();

  public form: FormGroup;
  goalTypesItems: RadioButtonItem[];

  get titleFormControl(): AbstractControl {
    return this.form.controls.title;
  }
  get descriptionFormControl(): AbstractControl {
    return this.form.controls.description;
  }

  constructor(private readonly fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.goalTypesItems = [
      { name: 'Daily', value: 'daily' },
      { name: 'Weekly', value: 'weekly' },
      { name: 'Lifelong', value: 'lifelong' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.goal.currentValue !== changes.goal.previousValue) {
      this.buildForm();
    }
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.formSubmitted.emit(this.form);
  }

  cancel(): void {
    this.cancelBtnClicked.emit();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [this.goal?.id || null],
      title: [this.goal?.title || '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: [this.goal?.description || '', Validators.maxLength(250)],
      type: [this.goal?.type || 'daily', Validators.required],
    });
  }
}
