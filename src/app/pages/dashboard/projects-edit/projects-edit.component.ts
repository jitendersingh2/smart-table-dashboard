import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { SmartTableServiceService } from '../smart-table/smart-table-service.service';
import { IndicatorsDialogComponent } from './indicators-dialog/indicators-dialog.component';

@Component({
  selector: 'ngx-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit {
  selectedProjects: any = [];

  constructor(
    public smartTableServiceService: SmartTableServiceService, 
    private router: Router, 
    private dialogService: NbDialogService,
    private windowService: NbWindowService,
  ) { }

  ngOnInit() {
    this.selectedProjects = this.smartTableServiceService.selectedProjects;
    console.log('this.selectedProjects- ', this.selectedProjects);
  }

  openWindow(contentTemplate, data) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Project Context',
        // hasBackdrop: false,
        windowClass: 'context-dialog',
        context: {
          text: data.replace(/\\r/g, '<br />').replace(/\\n/g, '<br />'),
        },
      },
    );
  }

  submit(project) {
    console.log('project- ', project);
    // const payload = {
    //   PROJ_ID: project.id,
    //   PROJ_DISPLAY_NAME: project.name,
    //   PROJ_STAT_NAME: project.status,
    //   PROJ_APPRVL_FY: project.approvedYear,
    //   RGN_NAME: project.region,
    //   CNTRY_LONG_NAME: project.country,
    //   SECT_BD_NAME: project.sector,
    //   ibrdFinancing: project.ibrdFinancing,
    //   closedDate: project.closedDate,
    //   lendingInstrument: project.lendingInstrument,
    //   padOricr: project.padOricr,
    //   countryChallenges: project.countryChallenges,
    //   projectGoals: project.projectGoals,
    //   dataPoint00: project.dataPoint00,
    //   dataPoint01: project.dataPoint01,
    //   dataPoint02: project.dataPoint02,
    //   dataPoint03: project.dataPoint03,
    //   indicators: project.indicators,
    // };
    // this.smartTableServiceService.updateProjectDetails(payload);
    this.smartTableServiceService.updateProject(project);
  }

  checkedChange(checked: boolean, result: string, project: any) {
    const { expectedResults } = project;
    let newExpectedResults = [];
    if(!checked) {
      newExpectedResults = expectedResults.filter(originalResult => originalResult !== result);
    } else {
      newExpectedResults = [...expectedResults, result].sort();
    }
    // this.expectedResults = newExpectedResults;
    this.smartTableServiceService.updateProject({...project, expectedResults: newExpectedResults });
  }

  editIndicators(project: any): void {
    this.dialogService.open(IndicatorsDialogComponent, {
      context: {
        data: {
          project
        }
      },
    }).onClose.subscribe(payload => {
      console.log('payload- ', payload);
      if(payload && payload.indicators && payload.indicators.length > 0) {
        this.selectedProjects = this.selectedProjects.map((project) => {
          if(project.id === payload.projectId) {
            project.indicators = [...payload.indicators].sort((a, b): any => a.indicator > b.indicator);
          }
          return project;
        });
      }
    });
  }

  next() {
    this.router.navigate(['pages', 'projects-download']).then(nav => {
      console.log('nav', nav); // true if navigation is successful
    }, err => {
      console.log('err', err) // when there's an error
    });;
  }
}
