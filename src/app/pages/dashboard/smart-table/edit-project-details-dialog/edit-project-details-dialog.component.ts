import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-project-details-dialog',
  templateUrl: './edit-project-details-dialog.component.html',
  styleUrls: ['./edit-project-details-dialog.component.scss']
})
export class EditProjectDetailsDialogComponent {

  @Input() data: any;
  
  constructor(protected ref: NbDialogRef<EditProjectDetailsDialogComponent>) { }

  updateProjectDetails(fieldType: string, fiedlValue: string) {
    this.data.projectDetails[fieldType] = fiedlValue;
  }
  
  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.data.projectDetails);
  }
}
