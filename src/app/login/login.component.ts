import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string=''
  password:any
  fail:boolean=false
  constructor(
    private Router:Router


  ) { }

  ngOnInit(): void {
  }

  OnSubmit(f:NgForm){
    this.userName=f.value.userName
    this.password=f.value.password
    console.log(this.userName,this.password)
    if(f.value.userName=='admin' && f.value.password=='admin')
    {
    localStorage.setItem('session','loggedin')  
    this.Router.navigate(['app/violations'])
    }
   
  }

}
