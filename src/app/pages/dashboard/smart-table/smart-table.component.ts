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

  sectors: Array<String> = [];
  countries: Array<String> = [];
  regions: Array<String> = [];
  data: any;
  selectedSector: string = '';
  selectedCountry: string = '';
  
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
    this.data = data;
    this.source.load(data);
    this.sectors = data.map(project => project.sector);
    this.countries = data.map(project => project.country);
    this.regions = data.map(project => project.region);
  }

  filterTable(filterType: string, filterValue: string): void {
    if (filterType === 'sector') {
      this.selectedSector = filterValue;
    } else if (filterType === 'country') {
      this.selectedCountry = filterValue;
    }
    const data = this.data.filter(project => (this.selectedSector === '' || project.sector === this.selectedSector) && (this.selectedCountry === '' || project.country === this.selectedCountry));
    this.source.load(data);
  }

  onClick(event: any): void {
    this.dialogService.open(EditProjectDetailsDialogComponent, {
      context: {
        data: {
          projectDetails: event.data,
          sectors: this.sectors,
          countries: this.countries,
          regions: this.regions,
        }
      },
    });
  }
}
