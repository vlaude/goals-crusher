import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { UserFacade } from '../../../facades/user.facade';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vl-avatar-edit',
  templateUrl: './avatar-edit.component.html',
  styleUrls: ['./avatar-edit.component.scss'],
})
export class AvatarEditComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;
  @Output() done = new EventEmitter<void>();

  destroy$: Subject<null> = new Subject();

  imageFileTypes = ['image/gif', 'image/jpeg', 'image/png'];
  fileToUpload: File;
  avatarPreview: string | ArrayBuffer;
  uploadProgress$: Observable<number>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly storageService: StorageService,
    private readonly userFacade: UserFacade,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.avatarPreview = this.user.photoURL || 'assets/blank-avatar.png';
  }

  async submit(): Promise<void> {
    if (!this.fileToUpload) {
      return;
    }
    if (!this.imageFileTypes.includes(this.fileToUpload.type)) {
      this.snackbarService.show('Invalid file format 😣.', 'danger');
      return;
    }

    const mediaFolderPath = `avatars/${this.user.email}/media/`;
    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(
      mediaFolderPath,
      this.fileToUpload
    );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$.pipe(takeUntil(this.destroy$)).subscribe(
      (downloadUrl) => {
        this.userFacade.updateCurrentUserAvatar(downloadUrl);
      },
      (error) => {
        this.snackbarService.show('Error while uploaded the avatar 😣. Please try again later.');
        console.log('Error while uploaded the avatar 😣');
        console.error(error);
      },
      () => {
        setTimeout(() => {
          this.uploadProgress$ = null;
          this.fileToUpload = null;
          this.done.emit();
        }, 1000);
      }
    );
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

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
