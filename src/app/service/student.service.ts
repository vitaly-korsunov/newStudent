
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
constructor(private _http:HttpClient){}
//api/students
Url! : 'https://localhost:44329/api/students'
  addStudent(data:any) :Observable<any>{
      return this._http.post('http://localhost:3000/students',data)
    //return this._http.post('https://localhost:44329/api/students',data)
  }
  updateStudent(id:number ,data:any) :Observable<any>{
     return this._http.put('http://localhost:3000/students/'+id,data)
     // return this._http.put('https://localhost:44329/api/students/'+id,data)
  }
  getStudentList() :Observable<any>{
      return this._http.get('http://localhost:3000/students')
    // return this._http.get('https://localhost:44329/api/students')
  }
  deleteStudent(id:number):Observable<any>{
     
     
   //  return this._http.delete('https://localhost:44329/api/students/'+id)
   return this._http.delete('http://localhost:3000/students/'+id)
  }

}
