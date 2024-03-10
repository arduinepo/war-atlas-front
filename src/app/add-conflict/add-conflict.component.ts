import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Ethnie,CritereTree, Critere, CritereEnum,Reference} from '../../models/models';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SupplyingService } from '../supplying.service';
import { MotiveChoiceComponent } from '../motive-choice/motive-choice.component';
import {MatTabsModule,}from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { CriteresReaderService } from '../criteres-reader.service';
import { TabComponent } from '../criteres/tab/tab.component';
import { TribeChoiceComponent } from '../tribe/tribe-choice/tribe-choice.component';

import { InputMaskModule } from 'primeng/inputmask';


@Component({
    selector: 'add-conflict',
    standalone: true,
    templateUrl: './add-conflict.component.html',
    styleUrl: './add-conflict.component.css',
    imports: [InputMaskModule,MatInputModule,MatExpansionModule,CommonModule, FormsModule,ReactiveFormsModule,MotiveChoiceComponent,MatTabsModule,
      MatFormFieldModule, MatButtonModule,TabComponent,TribeChoiceComponent]
})
export class AddConflictComponent {
  ethnie:Ethnie={name:'',region:{name:'',continent:{name:''}},latitude:0,longitude:0};

  criteres:CritereTree;
  criteresResults:{[key:string]:any}={};
  tabsData:{[key:string]:boolean}={"myths":false,"gods":false,"rituals":false,"motives":false};
  sources:string='';
  ref:Reference=this.supply.emptyRef;

  step = 0;
  halfWidth:string="halfWidth";
  fullWidth:string="fullWidth";

  setStep(index: number) {
    this.step = index;
  }

  hasData(list:string):void{
    let hasData=false;
    for (let c of this.criteres[list as keyof typeof this.criteres]){
      if (c.value!=CritereEnum.Unknown) hasData=true;
    }
    this.tabsData[list]=hasData;
  }

  constructor(private supply:SupplyingService,private criteresServ:CriteresReaderService){
    this.criteres=this.criteresServ.getCriteres();

    supply.getCritereSubject().subscribe((critere:Critere)=>{
      if( critere.name!="")
      this.criteresResults[critere.name]=critere.value;
    });
  }

  submitWar():void{
    console.log(this.ref)
    this.supply.addWar(this.ethnie,this.criteresResults,this.tabsData,this.ref);
  }

  setTribe(eth:Ethnie){
    this.ethnie=eth;
  }

}
