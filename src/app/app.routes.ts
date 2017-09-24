import { TransactionComponent } from './transaction/tranasaction.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { CardComponent } from './card/card.component';
import { Routes, RouterModule } from '@angular/router';

const Routes: Routes = [
            {path: '', component: CardComponent},
            {path: 'withdraw',  component: WithdrawComponent},
            {path: 'transaction',  component: TransactionComponent}
];

export const appRouterProviders = RouterModule.forRoot(Routes);
