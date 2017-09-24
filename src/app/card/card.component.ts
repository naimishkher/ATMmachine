import { SharedService } from './../sharedService';
import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
  constructor(private router: Router, public http: Http, private _sharedService: SharedService) {
      this._sharedService = _sharedService;
      this.router = router;
  }

  ngOnInit() { }

  check_verify(cardData) {
    this.http.post('/isCardValid', cardData)
        .map(res => res.json())
        .subscribe(res_data => {
            if (res_data.success === true) {
                this._sharedService.saveCardId(res_data.cardDetail._id);
                this.router.navigate(['/withdraw']);
            } else {
                alert(res_data.message);
            }
        });
  }
}
