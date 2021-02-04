import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BasepageService } from '../core/basepage.service';
import { ISpaceship } from '../core/model/spaceship.interface';
import { StarWarsService } from '../core/star-wars.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'consumables', 'MGLT', 'stopsNumber'];
  dataSource: MatTableDataSource<ISpaceship>;
  public starShipsData = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public starWarsService: StarWarsService,
    public basePageService: BasepageService
  ) {
  }

  ngAfterViewInit() {
    this.setStartshipsData();
  }

  setStartshipsData() {
    this.starWarsService.getStarshipsData()
      .then((ships: any) => {
        this.starShipsData = ships.results;
        this.initDataSource(this.starShipsData);
      });
  }

  initDataSource(data: ISpaceship[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMGLTValue(value: number) {
    return value;
  }
}
