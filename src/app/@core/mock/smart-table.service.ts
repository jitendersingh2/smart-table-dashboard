import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [...Array(60)].map((_, i) => ({
    id: i + 1,
    name: `Project Name ${i + 1}`,
    description: `Project Description ${i + 1}`,
    status: 'Closed',
    approvedYear: '2012',
    ibrdFinancing: 400,
    region: `Region ${i + 1}`,
    country: `Country ${i + 1}`,
    sector: `Sector ${i + 1}`,
    closedDate: '2019',
    lendingInstrument: 'Other',
    padOricr: 'PAD',
  }));

  getData() {
    return this.data;
  }
}
