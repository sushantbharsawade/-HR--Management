import { Component } from '@angular/core';
import { FormBuilder ,FormGroup ,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR-Management';
  employeeForm : FormGroup = new FormGroup({});

  constructor (private _fb : FormBuilder) {}

  ngOnInit(){
     this.setEmpForm();
  }

  setEmpForm ()
  {
     this.employeeForm = this._fb.group({
       id : [0],
       department :['', Validators.required],
       empName : ['', Validators.required],
       mobile : ['', Validators.required],
       Gender : ['', Validators.required],
       JoinDate : ['', Validators.required],
       Email : ['', Validators.required],
       Salary : ['', Validators.required],
       Password : ['', Validators.required],
       ConfirmPass : ['', Validators.required],
       EmpStatus : [false, Validators.requiredTrue]
     });

  }

  FormSubmit(){
   console.log(this.employeeForm.value);
  }

  get f(){
    return this.employeeForm.controls;
  }

 

}
