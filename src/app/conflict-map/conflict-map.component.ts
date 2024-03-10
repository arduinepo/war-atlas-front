import { Component, ElementRef, Input, OnDestroy} from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CommonModule} from '@angular/common';
import { SupplyingService } from '../supplying.service';
import { Critere, CritereTree, War } from '../../models/models';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { CriteresReaderService } from '../criteres-reader.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { TabComponent } from '../criteres/tab/tab.component';
import { tileLayer,marker,latLng,icon,Icon } from 'leaflet';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-conflict-map',
  standalone: true,
  imports: [MatExpansionModule,CommonModule, FormsModule,ReactiveFormsModule,MatTabsModule,
    MatFormFieldModule, MatButtonModule,TabComponent,LeafletModule],
  templateUrl: './conflict-map.component.html',
  styleUrl: './conflict-map.component.css'
})
export class ConflictMapComponent implements OnDestroy{
  @Input()criteres:CritereTree;
  criteresResults:{[key:string]:any}={};
  tabsData:{[key:string]:boolean}={"myths":false,"gods":false,"rituals":false,"motives":false};
  
  showFilters=true;
  step = 0;
  halfWidth:string="halfWidth";
  fullWidth:string="fullWidth";

  options= {
      layers: [
        tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
    maxZoom: 13})
  
      ],
      zoom: 2,
      center: latLng(0, 0)
    }
  
  icon=icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'src/assets/marker-icon.png',
    iconRetinaUrl: 'src/assets/marker-icon-2x.png',
    shadowUrl: 'src/assets/marker-shadow.png'
  });

  wars:War[]=[];

  currentMarkers:L.Marker[]=[];

  constructor(private zone:NgZone,private elementRef:ElementRef,private supply: SupplyingService,private criteresServ:CriteresReaderService) {
    this.criteres=this.criteresServ.getCriteres();
    supply.getCritereSubject().subscribe((critere:Critere)=>{
      if (critere.name!="")
        this.criteresResults[critere.name]=critere.value;
    });
    
  }

  setStep(index: number) {
    this.step = index;
  }

  onMapReady(map: L.Map,_this=this) {
    this.supply.getConflictsSubject().subscribe((wars)=>{
      _this.wars=wars;

      wars.forEach(w=>{
        let m=marker([w.ethnie.latitude,w.ethnie.longitude],{icon: this.icon});
        _this.currentMarkers.push(m);
        m.bindPopup(w.ethnie.name+"<br><button class=\"butt\">Détails</button><br>blabla")
          .on("popupopen",(a)=>{
           _this.elementRef.nativeElement.querySelector(".butt")
           .addEventListener('click',
            ()=>{_this.zone.run(()=>this.navigate(w.id))});
          })
        m.bindTooltip(w.ethnie.name);
        m.addTo(map);
      })
    });
  }
  
  ngOnDestroy(): void {
    //this.elementRef.nativeElement.remove();
  }
  
  navigate(id:number|undefined){
    this.supply.navigateWar(id);
  }

  searchWars(){
    this.currentMarkers.forEach(m=>m.remove());
    this.supply.searchWars(this.criteresResults);
    this.showFilters=false;
  }

  getAll(){
    this.currentMarkers.forEach(m=>m.remove());
    this.supply.getAllWars();
    this.showFilters=false;
  }


}
