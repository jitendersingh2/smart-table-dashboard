import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [...Array(60)].map((_, i) => ({
    id: i + 1,
    name: `Project Name ${i + 1}`,
    description: `Project Description ${i + 1}`,
    sector: `Sector ${i + 1}`,
    country: `Country ${i + 1}`,
    region: `Region ${i + 1}`,
  }));

  getData() {
    return this.data;
  }
}
