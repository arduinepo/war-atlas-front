import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MotiveChoiceComponent } from '../../motive-choice/motive-choice.component';
import { CommonModule } from '@angular/common';
import { Critere } from '../../../models/models';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [MotiveChoiceComponent,CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  halfWidth:string="halfWidth";
  fullWidth:string="fullWidth";

  @Input()tableClass:string="fullWidth";
  @Input()critereWidth:string="fullWidth";

  @Input()criteres:Critere[]=[];

  @Output() selected = new EventEmitter<boolean>();

  modify(crit:Critere):void{
    this.selected.emit(true);
  }

}
