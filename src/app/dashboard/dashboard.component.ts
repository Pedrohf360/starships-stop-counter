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

  userInputMGLT: number;
  visitedPages: Object = {};
  currentPage: number = 1;
  displayedColumns: string[] = ['name', 'consumables', 'MGLT', 'totalStops'];
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
    this.starWarsService.getStarshipsData(this.currentPage)
      .then((ships: any) => {
        if (!this.visitedPages[this.currentPage]) {
          this.starShipsData = this.starShipsData.concat(ships.results);
          this.visitedPages[this.currentPage] = ships.results;
        }

        this.setDataTotalStops();
        this.initDataSource(this.starShipsData);
      });
  }

  setDataTotalStops() {
    if (!this.userInputMGLT) {
      return;
    }
    this.starShipsData = this.starShipsData.map(res => {
      const totalStops =
        this.basePageService.getStopsNumberByMGLT(
          this.userInputMGLT,
          res.MGLT,
          res.consumables
        );

      res.totalStops = totalStops ? totalStops : '0';
      return res;
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

  getMGLTValue(inputValueMGLT: number) {
    this.userInputMGLT = inputValueMGLT;
    this.setStartshipsData();
  }

  changePage(page) {
    this.currentPage = page.pageIndex + 1;
    this.setStartshipsData()
  }
}
