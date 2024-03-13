import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_BASE_PATH : string = 'http://localhost:4200/api/';

  constructor(private _hc: HttpClient) { }

  getAllEmployees(){
    return this._hc.get(this.API_BASE_PATH+"employees")
  }
}
