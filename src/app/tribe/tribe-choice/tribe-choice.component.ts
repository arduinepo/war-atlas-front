import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Ethnie, Region } from '../../../models/models';
import { SupplyingService } from '../../supplying.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-tribe-choice',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,MatInputModule,FormsModule,CommonModule,AutoCompleteModule],
  templateUrl: './tribe-choice.component.html',
  styleUrl: './tribe-choice.component.css'
})
export class TribeChoiceComponent {
  regionsData: Region[]=[];
  ethniesData: Ethnie[]=[];
  ethnie:Ethnie={name:'',region:{name:'',continent:{name:''}},latitude:0,longitude:0};
  @Output() selected = new EventEmitter<Ethnie>();
  choix:any;

  filteredTribes: any[]=[];
  
  constructor(private supply:SupplyingService){
    supply.getRegionsSubject().subscribe((regs)=>{
      this.regionsData=regs;
    });
    supply.getEthniesSubject().subscribe((ethnies)=>{
        this.ethniesData=ethnies;
        this.filter('');
      });
    this.supply.getAllEthnies();
  }

  getRegions():void{
    this.supply.getRegions(this.ethnie.region.continent);
  }

  get regions():Array<Region>{
    return this.regionsData;
  }

  getEthnies():void{
    this.supply.getEthnies(this.ethnie.region);
  }

  get ethnies():Array<Ethnie>{
    return this.ethniesData;
  }

  set(){
    this.selected.emit(this.ethnie);
  }

  set2(){
    this.ethniesData.forEach((e)=>{if(this.choix.value==e.name)this.ethnie=e});
    this.selected.emit(this.ethnie);
  }

  filterTribes(event: AutoCompleteCompleteEvent) {
    this.filter(event.query);
  }

  filter(s:string){
    let filteredGroups:Map<string,any[]> = new Map();
        //chaque ethnie, prendre région ; si ré
        for (let ethnie of this.ethnies.filter((e)=>e.name.toLowerCase().includes(s.toLowerCase()))){
          if (filteredGroups.has(ethnie.region.name)){
            filteredGroups.get(ethnie.region.name)?.push({label:ethnie.name,value:ethnie.name});
          }
          else {
            let arr=[];
            arr.push({label:ethnie.name,value:ethnie.name});
            filteredGroups.set(ethnie.region.name,arr);
          }
        }
        this.filteredTribes=[];
        filteredGroups.forEach((r,e)=>this.filteredTribes.push({label:e,value:e,items:r.sort((a,b)=>{
          return a.label>b.label?1:(a.label==b.label?0:-1)
        })}));
        this.filteredTribes=this.filteredTribes.sort((a,b)=>{
          return a.label>b.label?1:(a.label==b.label?0:-1)
        })
  }

  
}
