import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartTableServiceService {
  public allProjects: any =  [];
  public selectedProjects: any =  [];

  constructor() { }

  setAllProjects(projects) {
    this.allProjects = projects;
  }

  setSelectedProjects(projectId: number, checked: boolean) {
    const selectedProject = this.allProjects.find(project => project.id === projectId);
    if(checked) {
      this.selectedProjects.push(selectedProject);
    } else {
      this.selectedProjects = this.selectedProjects.filter(project => project.id !== selectedProject.id);
    }
    // Sort the project by id
    this.selectedProjects = this.selectedProjects.sort((a, b) => a.id - b.id);
  }
}
