import { Component ,Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

 

@Component({
  selector: 'app-stu-add-edit',
  templateUrl: './stu-add-edit.component.html',
  styleUrls: ['./stu-add-edit.component.scss']
})
export class StuAddEditComponent implements OnInit {
  stuForm: FormGroup;
  education: string[] =[
    'Begin',
    'Midle',
    'Hier'
  ];
  constructor(
    private _fb: FormBuilder ,
    private _stuService:StudentService,
    private _dialogRef : MatDialogRef<StuAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ,
    private _coreService : CoreService
    ) 
   
    {
    this.stuForm= this._fb.group({
       firstName:'',
       lastName:'',
       gender:'',
       tz:'',
       dateOfBirth: '',
       countryOfBirth:'',
       hativa:'',
       kita:'',
       status:''
    })
  }
  ngOnInit():void{
    this.stuForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.stuForm.valid){
       if(this.data){
        this._stuService.updateStudent(this.data.id,this.stuForm.value).subscribe({
          next:(val:any)=>{
               // alert('Student Update Succsesfully')
                this._coreService.openSnackBar('Student Update Succsesfully','Done')
                this._dialogRef.close(true);
          },
          error:(err:any) =>{
            console.error(err)
          }
        })
    }else{
      this._stuService.addStudent(this.stuForm.value).subscribe({
        next:(val:any)=>{
              //alert('Student Added Succsesfully')
              this._coreService.openSnackBar('Student Added Succsesfully','Done')
              this._dialogRef.close(true);
        },
        error:(err:any) =>{
          console.error(err)
        },
      });
    }
    }
  }

}
