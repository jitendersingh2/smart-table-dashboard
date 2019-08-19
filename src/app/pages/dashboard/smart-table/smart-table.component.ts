import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import * as html2Pdf from 'html2pdf.js';
import { RowSelectComponent } from './row-select/row-select.component';
import { SmartTableServiceService } from './smart-table-service.service'

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
  approvalYears: Array<String> = [];
  data: any;
  selectedSectors: Array<String> = [];
  selectedCountries: Array<String> = [];
  selectedApprovalYears: Array<String> = [];
  
  settings = {
    mode: 'external',
    hideSubHeader	: true,
    actions: {
      add: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    columns: {
      id: {
        title: '',
        type: 'custom',
        renderComponent: RowSelectComponent,
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      approvedYear: {
        title: 'Approved Year',
        type: 'string',
      },
      region: {
        title: 'Region',
        type: 'string',
      },
      country: {
        title: 'Country',
        type: 'string',
      },
      sector: {
        title: 'Sector',
        type: 'string',
      },
      closedDate: {
        title: 'Closed Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private smartTableServiceService: SmartTableServiceService, private dialogService: NbDialogService) {
    const data = this.service.getData();
    this.data = data;
    this.smartTableServiceService.setAllProjects(this.data);
    this.source.load(data);
    this.sectors = this.removeDuplicatesFromArray(data.map(project => project.sector));
    this.countries = this.removeDuplicatesFromArray(data.map(project => project.country));
    this.regions = this.removeDuplicatesFromArray(data.map(project => project.region));
    this.approvalYears = this.removeDuplicatesFromArray(data.map(project => project.approvedYear));
  }

  removeDuplicatesFromArray(A: Array<String>): Array<String> {
    return [...new Set(A)];
  }

  filterTable(filterType: string, filterValue: Array<String>): void {
    if (filterType === 'sector') {
      this.selectedSectors = filterValue;
    } else if (filterType === 'country') {
      this.selectedCountries = filterValue;
    } else if (filterType === 'approvalYear') {
      this.selectedApprovalYears = filterValue;
    }
    const data = this.data.filter(project => {
      return (this.selectedSectors.length === 0 || this.selectedSectors.includes(project.sector)) && 
             (this.selectedCountries.length === 0 || this.selectedCountries.includes(project.country)) &&
             (this.selectedApprovalYears.length === 0 || this.selectedApprovalYears.includes(project.approvedYear));
    });
    this.source.load(data);
  }
}
