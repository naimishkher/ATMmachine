import { CardId, TransactionDetail } from './sharedService';
import {Injectable} from '@angular/core';

export interface CardId {
   card_id: string;
}

export interface TransactionDetail {
    debitAmount: number;
    availableBalanceWhenDebited: number;
    transactionDetail: [ {
        note: number,
        count: number
    }];
}

@Injectable()
export class SharedService {
   sharingCardId: CardId = {card_id: '123'};
   sharingTransactionDetail: TransactionDetail = {
       debitAmount: 0,
       availableBalanceWhenDebited: 0,
       transactionDetail: [
           {
            note: 0,
            count: 0
           }
       ]
   };

   saveCardId(card_id) {
       this.sharingCardId.card_id = card_id;
   }

   getCardId() {
       return this.sharingCardId.card_id;
   }
}
