import { StuAddEditComponent } from './stu-add-edit/stu-add-edit.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { StudentService } from './service/student.service';
import { OnInit,ViewChild}  from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
 import{Student} from './Student'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  displayedColumns: string[] =['id', 'tz' ,'firstName' , 'lastName','countryOfBirth','dateOfBirth', 'gender','hativa','kita','status','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private _dialog:MatDialog , 
              private _stuService : StudentService,
              private _coreService:CoreService
              
              ){}

  openAddEditStuForm(){
   const dialogRef =this._dialog.open(StuAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next :(val)=>{
      if(val){
        this.getStudentList();
      }
    },
   });
  }

  ngOnInit():void{
    this.getStudentList()
     this.dataSource.filterPredicate = this.filterBySubject();
  }
  applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toUpperCase();
 }

 
 
filterBySubject() {
    let filterFunction = 
        (data: Student, filter: string): boolean => {
          if (filter) {
            const subjects = data.firstName;
            for (let i = 0; i < subjects.length; i++) {
              if (subjects[i].indexOf(filter) != -1) {
                return true;
              }
            }
            return false;
          } else {
            return true;
          }
       };
    return filterFunction;
}
 
    getStudentList(){
         this,this._stuService.getStudentList().subscribe({
          next:(res) =>{
               this.dataSource = new MatTableDataSource(res)
               this.dataSource.sort= this.sort
               this.dataSource.paginator=this.paginator
          },
          error : (err)=>{
            console.log(err)
          }
         })
    }
    /*
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    */ 
    deleteStudent(id:number){
      this._stuService.deleteStudent(id).subscribe({
        next:(res) => {
         // alert('Student Deleted');
          this._coreService.openSnackBar('Student Deleted','Done')
          this.getStudentList();
        },
        error:console.log,
      })
    }

    openEditForm(data:any){
      const dialogRef =this._dialog.open(StuAddEditComponent,{
        data 
     });
     dialogRef.afterClosed().subscribe({
      next :(val)=>{
        if(val){
          this.getStudentList();
        }
      },
     });
  }
}

