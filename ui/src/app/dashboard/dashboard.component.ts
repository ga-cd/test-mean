import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MaxSizeValidator} from "@angular-material-components/file-input";
import {InvoicesService, Job} from '../services/invoices.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

const ELEMENT_DATA: Job[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fileControl: FormControl;
  public files: any;
  maxSize= 16;

  displayedColumns: string[] = ['uploadJobId', 'fileName', 'rowsCount', 'createdAt', 'jobStatus'];
  dataSource = ELEMENT_DATA;

  constructor(
    private invoicesService:InvoicesService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
    this.getJobsData();
  }
  getJobsData() {
    this.invoicesService.getUploadJobs().subscribe((resp)=>{
      this.dataSource = resp.jobs;
    }, error => console.error(error))
  }
  ngOnInit() {
    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
      console.log(this.files);
    })
  }

  onFileSubmit(){
    this.invoicesService.uploadCSV(this.files[0])
      .subscribe((resp)=>{
        this._snackBar.open(resp.message, "", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
        setTimeout(()=>{
          this.getJobsData();
        }, 1000);
      },error => {
        this._snackBar.open("File Upload error", "", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
      })
  }

  rowClicked(row:any) {
    this.router.navigate(['invoices', row.uploadJobId]);
    console.log(row);
  }


}
