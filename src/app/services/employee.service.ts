import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empvm } from 'src/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_BASE_PATH : string = 'http://localhost:4200/api/';

  constructor(private _hc: HttpClient) { }
  
  getAllEmployees(){
    return this._hc.get(this.API_BASE_PATH+"employees")
  }

  getEmployees(empid : number){
  return this._hc.get(`${this.API_BASE_PATH}employees/${empid}`)
  }


  AddEmployees(empobj : empvm){
    return this._hc.post(`${this.API_BASE_PATH}employees`,empobj)
  }

  updateEmployees(empobj : empvm){
    return this._hc.put(`${this.API_BASE_PATH}employees/${empobj.id}`,empobj)
  }

  DeleteEmployee(empid : number){
  return this._hc.delete(`${this.API_BASE_PATH}employee/${empid} `);
  //return this._hc.delete(this.API_BASE_PATH + "employee/" + empid );
}

}
