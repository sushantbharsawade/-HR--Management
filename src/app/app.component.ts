import { Component } from '@angular/core';
import { FormBuilder ,FormGroup ,Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { empvm } from 'src/models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR-Management';
  employeeForm : FormGroup = new FormGroup({});
  employees : empvm[] = [];
  constructor (private _fb : FormBuilder , private _empservice:EmployeeService) {}

  ngOnInit(){
     this.setEmpForm();
     this.allEmployees();
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

  resetbtn(){
   this.employeeForm.reset();
  }

  cancelbtn(){
    this.employeeForm.reset();
  }

 allEmployees(){
  this._empservice.getAllEmployees().subscribe((Response :empvm[]) =>{
   this.employees = Response;
  })
 }

}
