import { SharedService, CardId, TransactionDetail } from './../sharedService';
import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {
    transactionDetail: any[];

  constructor(private router: Router, public http: Http, private _sharedService: SharedService) {
    this._sharedService = _sharedService;
    this.router = router;
   }

  ngOnInit() {
      this.http.get('/transactionDetail')
        .map(res => res.json())
        .subscribe(res_data => {
            if (res_data.success === true) {
              this.transactionDetail = res_data.transactionDetail;
              // this._sharedService.saveTransactionDetail(res_data);
            } else {
                alert(res_data.message);
            }
        });
   }

}
