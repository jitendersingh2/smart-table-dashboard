import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDownloadComponent } from './projects-download.component';

describe('ProjectsDownloadComponent', () => {
  let component: ProjectsDownloadComponent;
  let fixture: ComponentFixture<ProjectsDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
