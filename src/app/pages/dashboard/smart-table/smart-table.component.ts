import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
// import * as html2Pdf from 'html2pdf.js';
import { EditProjectDetailsDialogComponent } from './edit-project-details-dialog/edit-project-details-dialog.component';
import { RowSelectComponent } from './row-select/row-select.component';
import { SmartTableServiceService } from './smart-table-service.service';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  sectors: Array<String> = [];
  countries: Array<String> = [];
  regions: Array<String> = [];
  approvalYears: Array<String> = [];
  data: any;
  selectedSectors: Array<String> = [];
  selectedCountries: Array<String> = [];
  selectedApprovalYears: Array<String> = [];
  showSelectedProjects: boolean = false;
  selectedProjects: any = [];
  allIndicators: any = this.removeDuplicatesByKey(this.service.getResultIndicators().map(ind => ({
    indicator: ind.IND_NAME,
    target: ind.TGT_VAL_TEXT,
    type: ind.PROJ_IND_USAGE_TYPE_CODE,
  })), 'indicator');
  indicators = this.allIndicators.filter(ind => ind.type === "CI")
  
  settings = {
    mode: 'external',
    hideSubHeader	: true,
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    // edit: {
    //   editButtonContent: '<i class="nb-edit" (click)="editProjectDetails($event)"></i>',
    // },
    columns: {
      select: {
        title: '',
        type: 'custom',
        renderComponent: RowSelectComponent,
      },
      id: {
        title: 'ID',
        type: 'string',
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

  constructor(
    private service: SmartTableData, 
    public smartTableServiceService: SmartTableServiceService, 
    private dialogService: NbDialogService,
    private router: Router) {
      // To use mock data, comment out the below code and comment to the below ngOnit method code
      // const data = this.service.getData().map((projectDetails) => ({
      //   id: projectDetails.PROJ_ID,
      //   name: projectDetails.PROJ_DISPLAY_NAME,
      //   description: projectDetails.PROJ_DISPLAY_NAME,
      //   status: projectDetails.PROJ_STAT_NAME,
      //   approvedYear: projectDetails.PROJ_APPRVL_FY,
      //   ibrdFinancing: projectDetails.ibrdFinancing,
      //   region: projectDetails.RGN_NAME,
      //   country: projectDetails.CNTRY_LONG_NAME,
      //   sector: projectDetails.SECT_BD_NAME,
      //   closedDate: projectDetails.closedDate,
      //   lendingInstrument: projectDetails.lendingInstrument,
      //   padOricr: projectDetails.padOricr,
      //   expectedResults: projectDetails.expectedResults,
      //   countryChallenges: projectDetails.countryChallenges,
      //   projectGoals: projectDetails.projectGoals,
      //   dataPoint00: projectDetails.dataPoint00,
      //   dataPoint01: projectDetails.dataPoint01,
      //   dataPoint02: projectDetails.dataPoint02,
      //   dataPoint03: projectDetails.dataPoint03,
      //   select: '',
      //   ...this.service.getData01()[0],
      //   indicators: this.indicators,
      //   allIndicators: this.allIndicators,
      //   imgLink: '',
      //   sdgImages: [],
      // }));
      // this.data = this.smartTableServiceService.allProjects.length > 0 ? this.smartTableServiceService.allProjects : data;
      // this.smartTableServiceService.setAllProjects(this.data);
      // this.source.load(data);
      // this.sectors = this.removeDuplicatesFromArray(data.map(project => project.sector));
      // this.countries = this.removeDuplicatesFromArray(data.map(project => project.country));
      // this.regions = this.removeDuplicatesFromArray(data.map(project => project.region));
      // this.approvalYears = this.removeDuplicatesFromArray(data.map(project => project.approvedYear));
  }

  ngOnInit() {
    this.smartTableServiceService.selectedProjects = [];
    // To use actual data, comment out the below code and add comment to the constructor code
    this.smartTableServiceService.getAllProjects().subscribe((res: any) => {
      this.smartTableServiceService.getIndicatorss().subscribe((indicatorsRes: any) => {
        const allIndicators: any = this.removeDuplicatesByKey(indicatorsRes.response.data.map(ind => ({
          indicator: ind.IND_NAME,
          target: ind.TGT_VAL_TEXT,
          type: ind.PROJ_IND_USAGE_TYPE_CODE,
        })), 'indicator');
        const indicators = allIndicators.filter(ind => ind.type === "CI")
        const data = res.response.data.map((projectDetails) => ({
          id: projectDetails.PROJ_ID,
          name: projectDetails.PROJ_DISPLAY_NAME,
          description: projectDetails.PROJ_DISPLAY_NAME,
          status: projectDetails.PROJ_STAT_NAME,
          approvedYear: projectDetails.PROJ_APPRVL_FY,
          region: projectDetails.RGN_NAME,
          country: projectDetails.CNTRY_LONG_NAME,
          sector: projectDetails.SECT_BD_NAME,
          countryChallenges: projectDetails.countryChallenges,
          projectGoals: projectDetails.projectGoals,
          dataPoint00: 'Yes',
          dataPoint01: 'Blue Money',
          dataPoint02: 'Energy and Extractives',
          dataPoint03: 'Finance',
          ibrdFinancing: '400 Millions',
          closedDate: '2019',
          lendingInstrument: 'Other',
          padOricr: 'PAD',
          select: '',
          ...this.service.getData01()[0],
          indicators: indicators,
          allIndicators: allIndicators,
          imgLink: '',
          sdgImages: [],
        }));
        this.data = this.smartTableServiceService.allProjects.length > 0 ? this.smartTableServiceService.allProjects : data;
        this.smartTableServiceService.setAllProjects(this.data);
        this.source.load(data);
        this.sectors = this.removeDuplicatesFromArray(data.map(project => project.sector));
        this.countries = this.removeDuplicatesFromArray(data.map(project => project.country));
        this.regions = this.removeDuplicatesFromArray(data.map(project => project.region));
        this.approvalYears = this.removeDuplicatesFromArray(data.map(project => project.approvedYear));
      });
    });
  }

  removeDuplicatesFromArray(A: Array<String>): Array<String> {
    return [...new Set(A)];
  }

  removeDuplicatesByKey(myArr, key) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    });
  }

  next() {
    this.router.navigate(['pages', 'projects-edit']).then(nav => {
      console.log('nav', nav); // true if navigation is successful
    }, err => {
      console.log('err', err) // when there's an error
    });;
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
          projectDetails: {
            ...event.data,
          },
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
