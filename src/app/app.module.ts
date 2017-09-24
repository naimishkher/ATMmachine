import { TransactionComponent } from './transaction/tranasaction.component';
import { SharedService } from './sharedService';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { appRouterProviders } from './app.routes';
import { CardComponent } from './card/card.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    WithdrawComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    appRouterProviders,
    CommonModule,
    HttpModule,
    FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
