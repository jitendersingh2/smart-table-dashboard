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
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { RowSelectComponent } from './smart-table/row-select/row-select.component';

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
    FormsModule, 
    ReactiveFormsModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
  ],
  declarations: [
    DashboardComponent,
    SmartTableComponent,
    RowSelectComponent,
  ],
  providers: [],
  entryComponents: [
    SmartTableComponent,
    RowSelectComponent,
  ],
})
export class DashboardModule { }
