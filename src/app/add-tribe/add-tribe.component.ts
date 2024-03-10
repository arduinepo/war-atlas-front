import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Region,Ethnie} from '../../models/models';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SupplyingService } from '../supplying.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-tribe',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,MatButtonModule],
  templateUrl: './add-tribe.component.html',
  styleUrl: './add-tribe.component.css'
})
export class AddTribeComponent {
  regionsData: Region[]=[];
  tribe:Ethnie={name:'',region:{name:'',continent:{name:''}},latitude:0,longitude:0,lang:''};
  langsData:string[]=[];
  filename:string='';
  file:File|any;

  onFileSelected(event:any){
    this.file=event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(this.file);
  }

  submitFile(){
    this.supply.uploadTribes(this.file);
  }



  constructor(private supply:SupplyingService){
    supply.getRegionsSubject().subscribe((regs)=>{
      this.regionsData=regs;
    });
    supply.getLangsSubject().subscribe((langs)=>{this.langsData=langs});
    this.supply.getLangs();
  }

  submitTribe():void{
    this.supply.addTribe(this.tribe);
  }

  getRegions():void{
    this.supply.getRegions(this.tribe.region.continent);
  }

  get regions():Array<Region>{
    return this.regionsData;
  }

  get langs():Array<string>{
    return this.langsData;
  }

}
