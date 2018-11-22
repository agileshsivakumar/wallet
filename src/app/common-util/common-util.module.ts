import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  providers: [AlertService],
  exports: [AlertComponent]
})
export class CommonUtilModule {}
