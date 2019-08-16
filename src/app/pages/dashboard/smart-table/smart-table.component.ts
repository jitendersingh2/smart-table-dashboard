import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import * as html2Pdf from 'html2pdf.js';
import { EditProjectDetailsDialogComponent } from './edit-project-details-dialog/edit-project-details-dialog.component';
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
  data: any;
  selectedSector: string = '';
  selectedCountry: string = '';
  pdfOptions: any = {
    margin:       1,
    filename:     'Projects.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  settings = {
    mode: 'external',
    hideSubHeader	: true,
    actions: {
      add: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit" (click)="editProjectDetails($event)"></i>',
    },
    // delete: {
    //   deleteButtonContent: RowSelectComponent,
    // },
    columns: {
      id: {
        title: '',
        type: 'custom',
        renderComponent: RowSelectComponent,
        onComponentInitFunction: (instance) => {
          // console.log('instance- ', instance);
        }
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

  constructor(private service: SmartTableData, private smartTableServiceService: SmartTableServiceService, private dialogService: NbDialogService) {
    const data = this.service.getData();
    this.data = data;
    this.smartTableServiceService.setAllProjects(this.data);
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

  editProjectDetails(event: any): void {
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

  exportAsPdf(): void {
    const element = document.getElementById('exportPdfContent');
    element.innerHTML = '';
    element.style.display = 'block';
    const content = this.smartTableServiceService.selectedProjects.map(project => `
      <div>
        <h2>Projects</h2>
        <div>
          <h3>Project Name</h3>
          <p>${project.name}</p>
        </div>
        <div>
          <h3>Project Description</h3>
          <p>${project.description}</p>
        </div>
        <div>
          <h3>Project Sector</h3>
          <p>${project.sector}</p>
        </div>
        <div>
          <h3>Project Country</h3>
          <p>${project.country}</p>
        </div>
        <div>
          <h3>Project Region</h3>
          <p>${project.region}</p>
        </div>
      </div>
    `);
    element.innerHTML = content;
    html2Pdf().set(this.pdfOptions).from(element).save().then(() => {
      element.style.display = 'none';
    });
  }
}
