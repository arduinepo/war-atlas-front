import { Component, Input, ElementRef, OnInit, ChangeDetectionStrategy,} from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { SupplyingService } from '../supplying.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { CommonModule} from '@angular/common';
import { War } from '../../models/models';
import { toSize } from 'ol/size';
import { Init } from 'v8';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit{

  wars:War[]=[];

  oVectorSource = new VectorSource({wrapX: false});

  @Input() map?: Map;

  constructor(private elementRef: ElementRef,private supply: SupplyingService) {
    this.supply.getConflictsSubject().subscribe((wars)=>{
      this.wars=wars;
      this.oVectorSource.addFeatures(wars.map(
        (w)=>new Feature({geometry: new Point(fromLonLat([w.ethnie.longitude,w.ethnie.latitude]))})
      ));
    });
  }

  ngOnInit() {
    if(this.map){
      this.map.setTarget(this.elementRef.nativeElement);
    console.log(this.map.getTarget());}
  }

}
