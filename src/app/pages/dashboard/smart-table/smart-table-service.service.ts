import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmartTableServiceService {
  public allProjects: any =  [];
  public selectedProjects: any =  [];

  constructor(private httpClient: HttpClient) { }

  getAllProjects() {
    return this.httpClient.get('https://wbgauthservice.worldbank.org/BDProxyService?qs=%2Fjson%2FENTERPRISE%2FWB_OPERATION%2FPROJECT%2FPROJECT%2FPROJECT_MASTER_V2');
  }

  getIndicatorss() {
    return this.httpClient.get('https://wbgauthservice.worldbank.org/BDProxyService?qs=%2Fjson%2FENTERPRISE%2FWB_OPERATION%2FPROJECT%2FLENDING%2FPROJECT_RESULT_IND_DETAIL_V2%3FIN_PROJ_ID%3DP121540');
  }

  updateProjectDetails(payload) {
    return this.httpClient.put('https://wbgauthservice.worldbank.org/BDProxyService?qs=%2Fjson%2FENTERPRISE%2FWB_OPERATION%2FPROJECT%2FPROJECT%2FPROJECT_MASTER_V2', payload);
  }
  
  setAllProjects(projects) {
    this.allProjects = projects;
  }

  setSelectedProjects(projectId: number, checked: boolean) {
    const selectedProject = this.allProjects.find(project => project.id === projectId);
    if(checked) {
      const sProject = this.selectedProjects.find(project => project.id === projectId);
      if(!sProject) {
        this.selectedProjects.push(selectedProject);
      }
    } else {
      this.selectedProjects = this.selectedProjects.filter(project => project.id !== selectedProject.id);
    }
    // Sort the project by id
    this.selectedProjects = this.selectedProjects.sort((a, b) => a.id - b.id);
  }

  updateProject(project) {
    this.allProjects = this.allProjects.map((proj) => {
      let uProj = {...proj };
      if(proj.id === project.projectId) {
        uProj = project;
      }

      return uProj;
    });

    this.selectedProjects = this.selectedProjects.map((proj) => {
      let uProj = {...proj };
      if(proj.id === project.projectId) {
        uProj = project;
      }

      return uProj;
    });
  }

  updateExpectedResults(projectId, newExpectedResults) {
    this.allProjects = this.allProjects.map((proj) => {
      let uProj = {...proj };
      if(proj.id === projectId) {
        uProj.expectedResults = newExpectedResults;
      }

      return uProj;
    });

    this.selectedProjects = this.selectedProjects.map((proj) => {
      let uProj = {...proj };
      if(proj.id === projectId) {
        uProj.expectedResults = newExpectedResults;
      }

      return uProj;
    });
  }
}
