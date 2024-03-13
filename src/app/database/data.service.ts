import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';
import { empvm } from 'src/models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    let employees : empvm[] = [
      {id : 1, department : 'Accounts' , empName : ' raje', mobile : '1700170017', gender : 'Male', JoinDtae : '01-04-2024', email : 'raje@gmail.com', salary : 45000, password : '1234', empstatus : true},
      {id : 2, department : 'Manager' , empName : 'majharj ', mobile : '1800180018', gender : 'Male', JoinDtae : '02-05-2024', email : 'shabhu@gmail.com', salary : 49000, password : '1234', empstatus : true},
      {id : 3, department : 'Accounts' , empName : ' shabhurji', mobile : '1900190019', gender : 'Male', JoinDtae : '03-05-2024', email : 'shivaji@gmail.com', salary : 50000, password : '1234', empstatus : true}
    ]

    return {employees};
  }
}
