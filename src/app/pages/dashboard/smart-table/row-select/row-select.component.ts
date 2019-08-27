import { Component } from '@angular/core';
import { SmartTableServiceService } from '../smart-table-service.service';

@Component({
  selector: 'ngx-row-select',
  templateUrl: './row-select.component.html',
  styleUrls: ['./row-select.component.scss']
})
export class RowSelectComponent {


  constructor(private smartTableServiceService: SmartTableServiceService) { }

  checkedChange(event: any) {
    // @ts-ignore
    console.log('val- ', this);
    // @ts-ignore
    this.smartTableServiceService.setSelectedProjects(this.rowData.id, event);
  }

}
