import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';
import { AddConflictComponent } from './add-conflict/add-conflict.component';
import { ConflictMapComponent } from './conflict-map/conflict-map.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SupplyingService } from './supplying.service';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddConflictComponent,ConflictMapComponent,MatSidenavModule,
    RouterLink, RouterLinkActive,CommonModule,LeafletModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'warfront';

  constructor(private supply:SupplyingService){
  }

  get isLoggedIn():boolean{
    return this.supply.isLoggedIn;
  }

  openDialog():void{
    this.supply.isLoggedIn=false;
  }

}
