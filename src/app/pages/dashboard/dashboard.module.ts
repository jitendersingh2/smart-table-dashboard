import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbInputModule,
  NbCheckboxModule,
  NbSelectModule,
  NbListModule,
  NbTooltipModule,
  NbAccordionModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { EditProjectDetailsDialogComponent } from './smart-table/edit-project-details-dialog/edit-project-details-dialog.component';
import { RowSelectComponent } from './smart-table/row-select/row-select.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ProjectsDownloadComponent } from './projects-download/projects-download.component';
import { IndicatorsDialogComponent } from './projects-edit/indicators-dialog/indicators-dialog.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbDialogModule.forChild(),
    Ng2SmartTableModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbTooltipModule,
    FormsModule, 
    ReactiveFormsModule,
    NbListModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbAccordionModule,
  ],
  declarations: [
    DashboardComponent,
    SmartTableComponent,
    EditProjectDetailsDialogComponent,
    RowSelectComponent,
    ProjectsEditComponent,
    ProjectsDownloadComponent,
    IndicatorsDialogComponent,
  ],
  providers: [],
  entryComponents: [
    SmartTableComponent,
    EditProjectDetailsDialogComponent,
    RowSelectComponent,
    IndicatorsDialogComponent,
  ],
})
export class DashboardModule { }
