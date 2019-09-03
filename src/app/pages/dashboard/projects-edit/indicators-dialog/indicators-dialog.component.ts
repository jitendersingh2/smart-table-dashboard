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
  selectedIndicators: any = [];

  constructor(protected ref: NbDialogRef<IndicatorsDialogComponent>) { }

  ngOnInit() {
    const existingIndicators = this.data.project.indicators.map(ind => ind.indicator);
    this.allIndicators = this.data.project.allIndicators.map((ind) => {
      if(existingIndicators.indexOf(ind.indicator) > -1) {
        ind.checked = true;
      }
      return ind;
    });
    this.selectedIndicators = this.allIndicators.filter(ind => ind.checked);
  }

  checkedChange(checked: boolean, targetIndicator: any) {
    const selectedIndicators = this.selectedIndicators;
    let newSelectedIndicators = selectedIndicators;
    if(!checked) {
      newSelectedIndicators = selectedIndicators.filter(originalIndicator => originalIndicator.indicator !== targetIndicator.indicator);
    } else {
      targetIndicator.checked = true;
      newSelectedIndicators.push(targetIndicator);
    }
    this.selectedIndicators = newSelectedIndicators;
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.allIndicators = this.allIndicators.map((ind) => {
      ind.checked = null;
      return ind;
    });
    this.selectedIndicators = this.selectedIndicators.map((ind) => {
      ind.checked = null;
      return ind;
    });
    this.ref.close({
      projectId: this.data.project.id,
      indicators: this.selectedIndicators,
    });
  }
}
