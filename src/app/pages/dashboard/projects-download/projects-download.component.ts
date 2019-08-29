import { Component, OnInit } from '@angular/core';
import { SmartTableServiceService } from '../smart-table/smart-table-service.service';

@Component({
  selector: 'ngx-projects-download',
  templateUrl: './projects-download.component.html',
  styleUrls: ['./projects-download.component.scss']
})
export class ProjectsDownloadComponent implements OnInit {
  projects: any = [];
  selectedProjects: any = [];

  constructor(private smartTableServiceService: SmartTableServiceService) { }

  ngOnInit() {
    this.projects = this.smartTableServiceService.selectedProjects;
    console.log('this.selectedProjects- ', this.projects);
  }

  checkedChange(checked: boolean, project: any) {
    // console.log('e- ', checked, result);
    const selectedProjects = this.selectedProjects;
    let newSelectedProjects = [];
    if(!checked) {
      this.selectedProjects = selectedProjects.filter(sProject => sProject.id !== project.id);
    } else {
      this.selectedProjects.push(project);
    }
  }

  exportAsDoc(): void {
    const selectedProjects = this.selectedProjects;
    console.log('selectedProjects- ', selectedProjects);
    if(selectedProjects.length === 0) {
      return ;
    }
    selectedProjects.forEach(project => {
      const content = document.getElementById(project.id).innerHTML;
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
    });
  }
}
