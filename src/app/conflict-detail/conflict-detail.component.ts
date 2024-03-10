import { Component, Input, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { SupplyingService } from '../supplying.service';
import { Critere, CritereEnum, CritereTree, Features, War } from '../../models/models';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { CriteresReaderService } from '../criteres-reader.service';
import {MatChipsModule} from '@angular/material/chips';
import { MotiveChoiceComponent } from '../motive-choice/motive-choice.component';

@Component({
  selector: 'app-conflict-detail',
  standalone: true,
  imports: [MatButtonModule,MatExpansionModule,CommonModule,MatChipsModule,MotiveChoiceComponent],
  templateUrl: './conflict-detail.component.html',
  styleUrl: './conflict-detail.component.css'
})
export class ConflictDetailComponent implements OnInit {
  war: War | undefined;
  @Input()feat?:Features;
  @Input()inList:boolean=false;
  criteresTree:CritereTree;
  critereWidth:string="fullWidth";

  criteres(str:string):Critere[]{
    this.criteresTree[str as keyof typeof this.criteresTree].forEach((c)=>{
      if(c['sub']){
        c.sub=c.sub.filter((c)=>c.value!=CritereEnum.Unknown);
        c.sub.forEach((c2)=>{if (c2['sub']){
          c2.sub=c2.sub.filter((c3)=>c3.value!=CritereEnum.Unknown)
        }})
      }
      if(c['causes']){
        c.causes=c.causes.filter((c)=>c.value!=CritereEnum.Unknown);
      }
    });
    return this.criteresTree[str as keyof typeof this.criteresTree].filter((c)=>c.value!=CritereEnum.Unknown);
  }

  constructor(
    private route: ActivatedRoute,
    private featService:CriteresReaderService,
    private supply: SupplyingService
  ) {
    this.criteresTree=this.featService.getCriteres();
  }

  ngOnInit() {
    if (!this.feat)
      this.route.params.subscribe(params => {
        let id: number = +params['id'];
        this.supply.getConflict().subscribe(
          w=>{
            this.feat=w;
            this.war=w.conflict;
            this.feat['created_at']=new Date(w.created_at);
            this.setFeatures(w);
          });
        this.supply.getWar(id);
      });
      else this.setFeatures(this.feat);
  }

  setFeatures(w:Features){
    this.criteresTree=this.featService.getFeaturesWithValue(w);
  }

  goEdit(id:number=0){
    this.supply.goEdit(id);
  }

  goVersions(id:number=0){
    this.supply.goVersions(id);
  }

}
