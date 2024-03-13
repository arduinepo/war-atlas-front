import { AfterViewInit, Component, Input} from '@angular/core';
import * as d3 from 'd3';
import{type,objects,arcs,bbox,transform}from "../../assets/land-110m.json";

import { Critere, CritereTree, War } from '../../models/models';
import { SupplyingService } from '../supplying.service';
import { CriteresReaderService } from '../criteres-reader.service';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { TabComponent } from '../criteres/tab/tab.component';
import { CommonModule} from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

import {feature} from 'topojson-client';

@Component({
  selector: 'app-peirce-map',
  standalone: true,
  imports: [MatExpansionModule,CommonModule, FormsModule,ReactiveFormsModule,MatTabsModule,
    MatFormFieldModule, MatButtonModule,TabComponent,OverlayPanelModule,ButtonModule],
  templateUrl: './peirce-map.component.html',
  styleUrl: './peirce-map.component.css'
})
export class PeirceMapComponent implements AfterViewInit{
  @Input()criteres:CritereTree;
  criteresResults:{[key:string]:any}={};
  tabsData:{[key:string]:boolean}={"myths":false,"gods":false,"rituals":false,"motives":false};
  
  showFilters=true;
  wars:War[]=[];

  currentMarkers:d3.Selection<d3.BaseType,unknown,HTMLElement,any>[]=[];

  x=0;

  d3x:any;

  step = 0;
  halfWidth:string="halfWidth";
  fullWidth:string="fullWidth";

  setStep(index: number) {
    this.step = index;
  }

  constructor(private supply: SupplyingService,private criteresServ:CriteresReaderService){
    this.criteres=this.criteresServ.getCriteres();
    supply.getCritereSubject().subscribe((critere:Critere)=>{
        if (critere.name!="")
          this.criteresResults[critere.name]=critere.value;
      });
  }

  ngAfterViewInit(): void {
    this.svg=d3.select("svg");
    let width = +window.innerWidth,
    height = +window.innerHeight;
    this.d3x=window['d3'];
    let data:any={type:type,objects:objects,arcs:arcs,bbox:bbox,transform:transform};
    data=feature(data,"land");
    console.log(data);
    let proj:any=this.d3x.geoPeirceQuincuncial().rotate([-90,-90,-20]).fitSize([width, height],{type:"Sphere"})
    let d:any=d3.geoPath().projection(proj);
    let path=d3.geoPath(proj);
    let graticule = path(d3.geoGraticule10());

    let svg2:any=document.getElementById("svg");

    this.svg.attr('viewBox',"0 0 "+width+" "+height);
    this.svgContent=this.svg.append("g").attr("transform-origin",""+width/2+" "+height/2).attr("fill","red");

    let land=this.svgContent.append("path")
              .attr("d", path(data));
        
              let grat=this.svgContent.append("path").attr("d",graticule).attr("fill","none")
              .attr("stroke","#000").attr("stroke-width","0.1");

    this.svg.on("dblclick",(evt:any)=>{
      let pt=new DOMPointReadOnly(evt.clientX,evt.clientY);
      let cursorpt =  pt.matrixTransform(svg2.getScreenCTM()?.inverse());
      let dims=this.svg.attr('viewBox').split(/\s+|,/);
      let x=cursorpt.x-Number(dims[2])/4,
          y=cursorpt.y-Number(dims[3])/4,
          w=Number(dims[2])/2,h=Number(dims[3])/2;
      this.svg.attr('viewBox',""+x+" "+y+" "+w+" "+h);
      this.r/=2;
      this.strokeWidth/=2;
      this.currentMarkers.forEach((m)=>m.attr('r',this.r).attr('stroke-width',this.strokeWidth));
    });

    this.svg.on("wheel",(evt:WheelEvent)=>{
      evt.preventDefault();
      if (evt.deltaY<0)
        this.zoom4();
      else this.dezoom4();
    });

    this.svg.on("mousedown",()=>
      this.moving=true
    );

    this.svg.on("mousemove",(evt:MouseEvent)=>{
      if(this.moving){
        let dims=this.svg.attr('viewBox').split(/\s+|,/);
        let x=Number(dims[0])-evt.movementX,
            y=Number(dims[1])-evt.movementY,
            w=dims[2],h=dims[3];
        this.svg.attr('viewBox',""+x+" "+y+" "+w+" "+h);
      }
    });

    this.svg.on("mouseup",()=>this.moving=false);

    this.supply.getConflictsSubject().subscribe((wars)=>{
      wars.forEach(w=>{
        let point=proj([w.ethnie.longitude,w.ethnie.latitude]);
        this.currentMarkers.push(
          this.svgContent.append("circle").attr("r",this.r).attr('cx',point[0])
          .attr('cy',point[1]).attr('fill','purple').attr('stroke','white')
          .attr("stroke-width",this.strokeWidth)
          .on("mouseover",(e:any)=>e.target.style.fill="yellow").on("mouseleave",(e:any)=>e.target.style.fill="purple")
          );
      });
    });
  }

  r=10;
  strokeWidth=2;

  zoomHalf(){
      let dims=this.svg.attr('viewBox').split(/\s+|,/);
      let x=Number(dims[0])+Number(dims[2])/4,
        y=Number(dims[1])+Number(dims[3])/4,
        w=Number(dims[2])/2,h=Number(dims[3])/2;
      this.svg.attr('viewBox',""+x+" "+y+" "+w+" "+h);
      this.r/=2;
      this.strokeWidth/=2;
      this.currentMarkers.forEach((m)=>m.attr('r',this.r).attr('stroke-width',this.strokeWidth));
  }

  dezoomHalf(){
      let dims=this.svg.attr('viewBox').split(/\s+|,/);
      let x=Number(dims[0])-Number(dims[2])/2,
        y=Number(dims[1])-Number(dims[3])/2,
        w=Number(dims[2])*2,h=Number(dims[3])*2;
      this.svg.attr('viewBox',""+x+" "+y+" "+w+" "+h);
      this.r*=2;
      this.strokeWidth*=2;
      this.currentMarkers.forEach((m)=>m.attr('r',this.r).attr('stroke-width',this.strokeWidth));
  }

  zoom4(){
    let dims=this.svg.attr('viewBox').split(/\s+|,/);
    let x=Number(dims[0])+Number(dims[2])/8,
      y=Number(dims[1])+Number(dims[3])/8,
      w=Number(dims[2])*3/4,h=Number(dims[3])*3/4;
    this.svg.attr('viewBox',""+x+" "+y+" "+w+" "+h);
    this.r=this.r*3/4;
    this.strokeWidth=this.strokeWidth*3/4;
    this.currentMarkers.forEach((m)=>m.attr('r',this.r).attr('stroke-width',this.strokeWidth));
  }

  dezoom4(){
      let dims=this.svg.attr('viewBox').split(/\s+|,/);
      let x=Number(dims[0])-Number(dims[2])/6,
        y=Number(dims[1])-Number(dims[3])/6,
        w=Number(dims[2])/3*4,h=Number(dims[3])*4/3;
      this.svg.attr('viewBox',""+x+" "+y+" "+w+" "+h);
      this.r=this.r*4/3;
    this.strokeWidth=this.strokeWidth*4/3;
    this.currentMarkers.forEach((m)=>m.attr('r',this.r).attr('stroke-width',this.strokeWidth));
  }

  rotation:number=0;

  rotateLeft(){
    this.rotation-=22.5;
    this.svgContent.attr('transform',"rotate("+this.rotation+")");
  }

  rotateRight(){
    this.rotation+=22.5;
    this.svgContent.attr('transform',"rotate("+this.rotation+")");
  }

  svg:any;
  svgContent:any;

  moving:boolean=false;

  

 getAll(){
    this.currentMarkers.forEach(m=>m.remove());
    this.supply.getAllWars();
    this.showFilters=false;
  }

}
