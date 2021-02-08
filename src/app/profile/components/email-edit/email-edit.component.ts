import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'vl-email-edit',
  templateUrl: './email-edit.component.html',
  styleUrls: ['./email-edit.component.scss'],
})
export class EmailEditComponent implements OnInit, OnChanges {
  @Input() user: UserModel;
  @Output() formSubmitted = new EventEmitter<FormGroup>();
  @Output() cancelBtnClicked = new EventEmitter<void>();

  fileToUpload: File;
  avatarPreview: string | ArrayBuffer;
  uploadProgress$: Observable<number>;

  form: FormGroup;

  get emailFormControl(): AbstractControl {
    return this.form.controls.email;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly storageService: StorageService,
    private readonly afAuth: AngularFireAuth
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user.currentValue !== changes.user.previousValue) {
      this.buildForm();
    }
  }

  async submit(): Promise<void> {
    // if (!this.form.valid) {
    //   return;
    // }

    const mediaFolderPath = `${this.user.email}/media/`;
    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(
      mediaFolderPath,
      this.fileToUpload
    );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$.subscribe(async (downloadUrl) => {
      console.log('COOL !', downloadUrl);
      (await this.afAuth.currentUser).updateProfile({ photoURL: downloadUrl });
    });

    // this.formSubmitted.emit(this.form);
  }

  cancel(): void {
    this.cancelBtnClicked.emit();
  }

  handleFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      [this.fileToUpload] = event.target.files;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      avatar: [null, [Validators.required, this.image.bind(this)]],
    });
  }

  private image(photoControl: AbstractControl): { [key: string]: boolean } | null {
    if (photoControl.value) {
      const avatar = photoControl.value;
      return null;
    }
    return;
  }
}
