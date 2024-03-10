import { Component, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { SupplyingService } from '../supplying.service';
import { Critere, CritereEnum, CritereTree, Features, War } from '../../models/models';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { CriteresReaderService } from '../criteres-reader.service';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MotiveChoiceComponent } from '../motive-choice/motive-choice.component';
import {MatTabsModule,}from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TabComponent } from '../criteres/tab/tab.component';

@Component({
  selector: 'app-conflict-edit',
  standalone: true,
  imports: [MatButtonModule,MatExpansionModule,CommonModule,MatChipsModule,FormsModule,ReactiveFormsModule,MotiveChoiceComponent,MatTabsModule,
    MatFormFieldModule, MatButtonModule,TabComponent],
  templateUrl: './conflict-edit.component.html',
  styleUrl: './conflict-edit.component.css'
})
export class ConflictEditComponent implements OnInit{
  war:War|undefined;
  feat:Features=JSON.parse(JSON.stringify(this.supply.emptyFeat))
  criteres:CritereTree={myths:[],gods:[],godsAttr:[],animals:[],equips:[],motives:[],rituals:[],returnRituals:[],fightType:[]};

  results:{[key:string]:string}={}
  tabsData:{[key:string]:boolean}={"myths":false,"gods":false,"rituals":false,"motives":false};

  step = 0;
  halfWidth:string="halfWidth";
  fullWidth:string="fullWidth";

  constructor(
    private route: ActivatedRoute,
    private featService:CriteresReaderService,
    private supply: SupplyingService
  ) {
    supply.getCritereSubject().subscribe((critere:Critere)=>{
      if (critere.name!="")
        this.results[critere.name]=critere.value;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id: number = +params['id'];
      this.supply.getConflict().subscribe(
        w=>{
          console.log(w)
          this.feat=w;
          this.war=w.conflict;
          this.feat.created_at=new Date(this.feat.created_at);
          this.setFeatures(this.feat);
      });
      this.supply.getWar(id);
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  setFeatures(w:Features){
    this.criteres=this.featService.getFeaturesWithValue(w);
  }

  submitWar():void{
    this.supply.updateWar(this.war,this.results,this.tabsData,this.feat.sources);
  }

  hasData(list:string):void{
    let hasData=false;
    for (let c of this.criteres[list as keyof typeof this.criteres]){
      if (c.value!=CritereEnum.Unknown) hasData=true;
    }
    this.tabsData[list]=hasData;
  }

}
