import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { EditProjectDetailsDialogComponent } from './edit-project-details-dialog/edit-project-details-dialog.component';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    mode: 'external',
    hideSubHeader	: true,
    actions: {
      add: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit" (click)="onClick($event)"></i>',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Project Name',
        type: 'string',
      },
      description: {
        title: 'Project Description',
        type: 'string',
      },
      sector: {
        title: 'Sector',
        type: 'string',
      },
      country: {
        title: 'Country',
        type: 'string',
      },
      region: {
        title: 'Region',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private dialogService: NbDialogService) {
    const data = this.service.getData();
    console.log('data- ', data);
    this.source.load(data);
  }

  onClick(event: any): void {
    console.log('e- ', event);
    this.dialogService.open(EditProjectDetailsDialogComponent, {
      context: {
        data: event.data,
      },
    });
  }
}
