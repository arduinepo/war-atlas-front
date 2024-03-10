import { Component, OnInit } from '@angular/core';
import { Features } from '../../models/models';
import { SupplyingService } from '../supplying.service';
import { ActivatedRoute } from '@angular/router';
import { ConflictDetailComponent } from '../conflict-detail/conflict-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-conflict-history',
  standalone: true,
  imports: [ConflictDetailComponent,MatExpansionModule,MatChipsModule,CommonModule,MatButtonModule],
  templateUrl: './conflict-history.component.html',
  styleUrl: './conflict-history.component.css'
})
export class ConflictHistoryComponent{
  listFeats:Features[]=[];

  constructor(private route: ActivatedRoute,private supply:SupplyingService){
    this.route.params.subscribe(params => {
      let id: number = +params['id'];
      this.supply.getFeaturesObs().subscribe(
        fs=>{
          this.listFeats=fs;
          console.log(fs);
        });
      this.supply.getFeatures(id);
    });
  }



  goEdit(id:number=0){
    this.supply.goEdit(id);
  }

}
