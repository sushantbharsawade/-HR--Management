import { Component } from '@angular/core';
import { FormBuilder ,FormGroup ,Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { empvm } from 'src/models/employee';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { DBoperation } from 'src/Helpers/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR-Management';
  employeeForm : FormGroup = new FormGroup({});
  employees : empvm[] = [];
  buttontext : string = "save";
  operation : DBoperation; 


  constructor (private _fb : FormBuilder , private _empservice:EmployeeService , private _toastr:ToastrService) {}

  ngOnInit(){
     this.setEmpForm();
     this.allEmployees();
  }

  setEmpForm ()
  {
  this.buttontext = "save";
  this.operation = DBoperation.create;
     this.employeeForm = this._fb.group({
       id : [0],
       department :['', Validators.required],
       empName : ['', Validators.required , Validators.minLength(3),Validators.minLength(20)],
       mobile : ['', Validators.required],
       Gender : ['', Validators.required],
       JoinDate : ['', Validators.required],
       Email : ['', Validators.required, [Validators.pattern('^([0-9a-zA-Z]([-\\.\\w][0-9a-zA-Z])@([0-9a-zA-Z][\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]],
       Salary : ['', Validators.required],
       Password : ['', Validators.required],
       ConfirmPass : ['', Validators.required],
       EmpStatus : [false, Validators.requiredTrue]
     });

  }

  FormSubmit(){
   console.log(this.employeeForm.value);
   if(this.employeeForm.invalid){
       return;
   }
   switch(this.operation){
     case DBoperation.create:
     this._empservice.AddEmployees(this.employeeForm.value).subscribe(res =>{
      this._toastr.success("employees Added Successfully", "employees Registration");
      this.allEmployees();
      this.resetbtn();
     })
     break; 

     case DBoperation.update:
      this._empservice.updateEmployees(this.employeeForm.value).subscribe(res =>{
        this._toastr.success("employees update Successfully", "employees Registration");
        this.allEmployees();
        this.resetbtn();
       })
     break;

   }
  }

  get f(){
    return this.employeeForm.controls;
  }

  resetbtn(){
   this.employeeForm.reset();
   this.buttontext = "save";
  }

  cancelbtn(){
    this.employeeForm.reset();
    this.buttontext = "save";
  }

 allEmployees(){
  this._empservice.getAllEmployees().subscribe((Response :empvm[]) =>{
   this.employees = Response;
  })
 }
 Edit(empid : Number){
  this.buttontext = "update";
  this.operation = DBoperation.update;
    // alert(empid);
    let empData = this.employees.find((e : empvm) =>{
      e.id === empid
    });
    this.employeeForm.patchValue(empData);

 }

 Delete(empid : number){
  //alert(empid);
 

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this._empservice.DeleteEmployee(empid).subscribe(res =>{
        this.allEmployees();
        this._toastr.success("Employee Deleted","Employee Registration");
    
      })
      // swalWithBootstrapButtons.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success"
      // });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });

 }


}
