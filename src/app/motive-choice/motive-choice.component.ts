import { AfterContentChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Critere, CritereEnum } from '../../models/models';
import { FormsModule} from '@angular/forms';
import { SupplyingService } from '../supplying.service';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motive-choice',
  standalone: true,
  imports: [MatChipsModule,FormsModule,CommonModule],
  templateUrl: './motive-choice.component.html',
  styleUrl: './motive-choice.component.css'
})
export class MotiveChoiceComponent {
  @Input()critere:Critere={label:'',name:'',value:CritereEnum.Unknown,sub:[]};
  @Output() selected = new EventEmitter<Critere>();
  @Input()critereWidth:string="fullWidth";
  @Input()widthClass:string="fullWidth";
  @Input()editable:boolean=true;

  constructor(private supply: SupplyingService){  }

  set():void{
    this.selected.emit(this.critere);
    this.supply.setCritere(this.critere);
  }

  modify(crit:Critere):void{
    if (crit.value==CritereEnum.Presence){
      this.critere.value=CritereEnum.Presence;
      this.critere.sub?.forEach((c)=>c.name==crit.name ?c.value=crit.value:null);
    }
    this.set();
  }

}
