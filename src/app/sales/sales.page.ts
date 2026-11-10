import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-sales',
  templateUrl: 'sales.page.html',
  styleUrls: ['sales.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent],
})
export class SalesPage {}
