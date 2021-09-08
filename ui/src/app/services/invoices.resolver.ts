


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { InvoicesService, InvoicesResponse } from "./invoices.service";



@Injectable()
export class InvoicesResolver implements Resolve<InvoicesResponse> {

  constructor(private invoicesService:InvoicesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoicesResponse> {
    return this.invoicesService.getInvoicesByJobId(route.params['jobId']);
  }

}

