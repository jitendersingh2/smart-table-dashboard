import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-project-details-dialog',
  templateUrl: './edit-project-details-dialog.component.html',
  styleUrls: ['./edit-project-details-dialog.component.scss']
})
export class EditProjectDetailsDialogComponent implements OnInit {

  @Input() data: any;
  expectedResults: Array<string> = [];
  
  constructor(protected ref: NbDialogRef<EditProjectDetailsDialogComponent>) { }

  ngOnInit() {
    this.expectedResults = this.data.projectDetails.expectedResults;
  }

  updateProjectDetails(fieldType: string, fiedlValue: string) {
    this.data.projectDetails[fieldType] = fiedlValue;
  }
  
  cancel() {
    this.ref.close();
  }

  checkedChange(checked: boolean, result: string) {
    console.log('e- ', checked, result);
    const { expectedResults } = this.data.projectDetails;
    let newExpectedResults = [];
    if(!checked) {
      newExpectedResults = expectedResults.filter(originalResult => originalResult !== result);
    } else {
      newExpectedResults = [...expectedResults, result].sort();
    }
    this.expectedResults = newExpectedResults;
  }

  submit() {
    this.ref.close({...this.data.projectDetails, expectedResults: this.expectedResults});
  }
}
