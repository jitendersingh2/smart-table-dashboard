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
      editButtonContent: '<i class="nb-edit" (click)="editProjectDetails($event)"></i>',
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
    const data = this.service.getData().map((projectDetails) => ({
      id: projectDetails.PROJ_ID,
      name: projectDetails.PROJ_DISPLAY_NAME,
      description: projectDetails.PROJ_LGL_NAME,
      status: projectDetails.PROJ_STAT_NAME,
      approvedYear: projectDetails.PROJ_APPRVL_FY,
      ibrdFinancing: projectDetails.ibrdFinancing,
      region: projectDetails.RGN_NAME,
      country: projectDetails.CNTRY_LONG_NAME,
      sector: projectDetails.SECT_BD_NAME,
      closedDate: projectDetails.closedDate,
      lendingInstrument: projectDetails.lendingInstrument,
      padOricr: projectDetails.padOricr,
      expectedResults: projectDetails.expectedResults,
      countryChallenges: projectDetails.countryChallenges,
      projectGoals: projectDetails.projectGoals,
      dataPoint00: projectDetails.dataPoint00,
      dataPoint01: projectDetails.dataPoint01,
      dataPoint02: projectDetails.dataPoint02,
      dataPoint03: projectDetails.dataPoint03,
    }));
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
    }).onClose.subscribe(updatedProject => {
      if(updatedProject) {
        const project = this.data.find(project => project.id === updatedProject.id);
        const updatedData = this.data.map(project => {
          if(project.id === updatedProject.id) {
            project = updatedProject;
          }

          return project;
        });

        this.data = updatedData;
        this.source.load(this.data);
      }
    });
  }

  exportAsPdf(): void {
    const selectedProjects = this.smartTableServiceService.selectedProjects;
    if(selectedProjects.length === 0) {
      return ;
    }
    const content = selectedProjects.map(project => `
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
    `).join('');

    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword'
    });
    // Create download link element
    const downloadLink = document.createElement("a");
    const filename = 'Project.doc';
    // Specify link url
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(preHtml + content + postHtml);
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else{
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    }
  }
}
