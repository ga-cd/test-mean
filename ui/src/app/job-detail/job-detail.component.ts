import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Invoice, InvoicesResponse} from "../services/invoices.service";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Location} from '@angular/common';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'invoiceId',
    'invoiceInternalId',
    'amount',
    'dueOn',
    'sellPrice',
    'isValidRow',
    'createdAt',
  ];
  dataSource = new MatTableDataSource<Invoice>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  invoicesResponse: InvoicesResponse | undefined;
  constructor(private route: ActivatedRoute,private _location: Location) {
  }

  ngOnInit(): void {
    this.invoicesResponse = this.route.snapshot.data["Invoices"];
    this.dataSource = new MatTableDataSource<Invoice>(this.invoicesResponse?.invoices.rows);
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  goBack() {
    this._location.back();
  }
}
