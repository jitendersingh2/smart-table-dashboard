import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-indicators-dialog',
  templateUrl: './indicators-dialog.component.html',
  styleUrls: ['./indicators-dialog.component.scss']
})
export class IndicatorsDialogComponent implements OnInit {
  @Input() data: any;
  allIndicators: any = [];

  constructor(protected ref: NbDialogRef<IndicatorsDialogComponent>) { }

  ngOnInit() {
    this.allIndicators = this.data.allIndicators;
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close();
  }
}
