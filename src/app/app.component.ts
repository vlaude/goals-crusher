import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'vl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly afMessaging: AngularFireMessaging, private readonly themeService: ThemeService) {
    this.afMessaging.requestPermission.pipe(mergeMapTo(this.afMessaging.tokenChanges)).subscribe(
      (token) => {
        console.log('Permission granted! Save to the server!', token);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
