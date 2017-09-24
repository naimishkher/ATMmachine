import { SharedService, CardId } from './../sharedService';
import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html'
})
export class WithdrawComponent implements OnInit {
  card_id: string;
  constructor(private router: Router, public http: Http, private _sharedService: SharedService) {
    this._sharedService = _sharedService;
    this.router = router;
    this.card_id = this._sharedService.getCardId();
   }

  ngOnInit() { }

  withdraw(withDrawData) {
    this.http.post('/isEnoughBalance', withDrawData)
        .map(res => res.json())
        .subscribe(res_data => {
            if (res_data.success === true) {
              // this._sharedService.saveTransactionDetail(res_data);
              this.router.navigate(['/transaction']);
            } else {
                alert(res_data.message);
            }
        });
  }
}
