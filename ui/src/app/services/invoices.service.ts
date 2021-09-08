import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  baseUrl = 'http://localhost:3690/';
  uploadUrl = `${this.baseUrl}invoice/bulk`;
  getUploadJobsUrl = `${this.baseUrl}invoice/jobs`;
  invoicesUrl = `${this.baseUrl}invoice`;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': this.baseUrl,
      'Authorization': `Bearer ${token}`
    });
  }

  getUploadJobs() {
    return this.http.get<JobsResponse>(this.getUploadJobsUrl, { headers: this.headers });
  }

  getInvoicesByJobId(jobId:string) {
    return this.http.get<InvoicesResponse>(`${this.invoicesUrl}/${jobId}?count=5000`, { headers: this.headers });
  }

  uploadCSV(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('invoices', fileToUpload, fileToUpload.name);
    return this.http.post<UploadResponse>(this.uploadUrl,formData, { headers: this.headers });
  }
}

export interface UploadResponse {
  message: string;
}
export interface Job {
  uploadJobId: number;
  fileName: string;
  jobStatus: string;
  rowsCount: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt?: any;
}

export interface JobsResponse {
  message: string;
  jobs: Job[];
}

export interface Invoice {
  invoiceId: number;
  invoiceInternalId: string;
  amount: number;
  dueOn: string;
  sellPrice: number;
  isValidRow: number;
  uploadJobId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
}

export interface InvoicesBundle {
  count: number;
  rows: Invoice[];
}

export interface InvoicesResponse {
  message: string;
  invoices: InvoicesBundle;
}
