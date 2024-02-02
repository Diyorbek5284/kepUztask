import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridAngular, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  userList: any[] = [];
  searchbox: string = '';
  counts: number = 1;
  griApi: any;
  constructor(private http: HttpClient) {}
  public rowSelection: 'single' | 'multiple' = 'single';
  colDefs: ColDef[] = [
    { field: 'id', headerName: 'Id' },
    { field: 'title', headerName: 'Title', filter: 'agTextColumnFilter' },

    {
      field: 'difficultyTitle',
      headerName: 'DifficultyTitle',
      filter: 'agSetColumnFilter',
    },
    { field: 'likesCount', headerName: 'Rating' },
    { field: 'solved', headerName: 'Solved' },
  ];

  // filed  api ichidagi am'lumotlarni olib jadvalga uzatadi
 

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    filter: true,
  };

  // pagedi oxiriga o'tish
  maxIncrement() {
    this.counts = 81;
    console.log(1);
    this.getUser();
  }
  // pagination oshib borishi
  increment() {
    if (this.counts == 81) {
      this.counts = 1;
    } else {
      this.counts++;
    }
    this.getUser();
    console.log(this.counts);
  }

  // pagination kamayib borishi
  decrement() {
    if (this.counts > 1) {
      this.counts--;
    } else if ((this.counts = 1)) {
      this.counts = 81;
    }
    this.getUser();
    console.log(this.counts);
  }

  // pagedi boshiga o'tish
  minDecrement() {
    this.counts = 1;
    console.log(1);
    this.getUser();
  }

  onGridReady(params: any) {
    this.griApi = params.api;
    this.getUser();
  }

  filterChange() {
    this.griApi.setQuickFilter(this.searchbox);
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let url = `https://kep.uz/api/problems?format=json&page=${this.counts}`;

    this.http.get(url).subscribe((res: any) => {
      console.log(res.data);
      this.userList = res.data;
    });
  }
}
