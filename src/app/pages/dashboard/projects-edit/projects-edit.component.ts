import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { SmartTableServiceService } from '../smart-table/smart-table-service.service';
import { IndicatorsDialogComponent } from './indicators-dialog/indicators-dialog.component';

@Component({
  selector: 'ngx-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit {
  selectedProjects: any = [];

  constructor(public smartTableServiceService: SmartTableServiceService, private router: Router, private dialogService: NbDialogService,) { }

  ngOnInit() {
    this.selectedProjects = this.smartTableServiceService.selectedProjects;
    console.log('this.selectedProjects- ', this.selectedProjects);
  }

  submit(project) {
    console.log('project- ', project);
    this.smartTableServiceService.updateProject(project);
  }

  checkedChange(checked: boolean, result: string, project: any) {
    // console.log('e- ', checked, result);
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

  editIndicators(allIndicators: any): void {
    this.dialogService.open(IndicatorsDialogComponent, {
      context: {
        data: {
          allIndicators
        }
      },
    }).onClose.subscribe(updatedProject => {
      
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
