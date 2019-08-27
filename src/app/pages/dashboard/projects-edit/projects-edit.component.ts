import { Component, OnInit } from '@angular/core';
import { SmartTableServiceService } from '../smart-table/smart-table-service.service';

@Component({
  selector: 'ngx-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit {
  selectedProjects: any = [];

  constructor(public smartTableServiceService: SmartTableServiceService) { }

  ngOnInit() {
    this.selectedProjects = this.smartTableServiceService.selectedProjects;
    console.log('this.selectedProjects- ', this.selectedProjects);
  }

  checkedChange(checked: boolean, result: string) {
    // console.log('e- ', checked, result);
    // const { expectedResults } = this.data.projectDetails;
    // let newExpectedResults = [];
    // if(!checked) {
    //   newExpectedResults = expectedResults.filter(originalResult => originalResult !== result);
    // } else {
    //   newExpectedResults = [...expectedResults, result].sort();
    // }
    // this.expectedResults = newExpectedResults;
  }
}