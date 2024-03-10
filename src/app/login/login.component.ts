import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SupplyingService } from '../supplying.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user:User={username:'',password:'',email:''};

  constructor(private supply:SupplyingService){}

  login(){
    this.supply.login(this.user).subscribe((res)=>{
      
    });
  }

}
