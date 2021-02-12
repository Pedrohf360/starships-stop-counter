import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IStarship } from '../core/model/starship.interface';
import { StarWarsService } from '../core/star-wars.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  userInputMGLT: number;
  visitedPages: Object = {};

  displayedColumns: string[] = ['name', 'consumables', 'MGLT', 'totalStops'];
  dataSource: MatTableDataSource<IStarship>;
  public starShipsData = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  itemsPerPage: number = 10;
  currentPage: number = 1;
  existsNextPage: boolean = true;
  existsPreviousPage: boolean = false;
  totalLength: number;

  relativePageText: string;
  isChangingPage: boolean;

  constructor(
    public starWarsService: StarWarsService
  ) {
  }

  ngAfterViewInit() {
    this.setStartshipsData();
  }

  setStartshipsData() {
    this.isChangingPage = true;

    this.starWarsService.getStarshipsData(this.currentPage)
      .then((res: any) => {
        this.existsNextPage = typeof res.next === 'string';
        this.existsPreviousPage = typeof res.previous === 'string';

        this.totalLength = res.count;
        if (!this.visitedPages[this.currentPage]) {
          this.visitedPages[this.currentPage] = res.results;
        }

        this.starShipsData = this.visitedPages[this.currentPage];

        this.setDataTotalStops();
        this.initDataSource(this.starShipsData);
        this.setRelativePageString();
        this.isChangingPage = false;
      });
  }

  setDataTotalStops() {
    if (!this.userInputMGLT) {
      return;
    }
    this.starShipsData = this.starShipsData.map(res => {
      const totalStops =
        this.starWarsService.getStopsNumberByMGLT(
          this.userInputMGLT,
          res.MGLT,
          res.consumables
        );

      res.totalStops = totalStops ? totalStops : '0';
      return res;
    });
  }

  initDataSource(data: IStarship[]) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource(data);
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
    this.starShipsData = [];
    this.userInputMGLT = inputValueMGLT;
    this.visitedPages = {};
    this.dataSource.paginator.firstPage();
    this.setPage(1);
  }

  setPage(pageNumber: number) {
    if (!this.isChangePageAvailable()) {
      return;
    }
    this.currentPage = pageNumber;
    this.setStartshipsData()
  }

  isChangePageAvailable() {
    if (this.isChangingPage || !this.existsPreviousPage) {
      return false;
    }
    return true;
  }

  changePageValidate() {
    if (!this.isChangePageAvailable()) {
      return;
    }
  }

  previousPage() {
    if (!this.isChangePageAvailable()) {
      return;
    }

    this.currentPage--;
    this.setStartshipsData()
  }

  nextPage() {
    if (!this.existsNextPage) {
      return;
    }

    this.currentPage++;
    this.setStartshipsData()
  }

  setRelativePageString() {
    const fromNumberLine: number = !this.existsPreviousPage ? 1 : ((this.currentPage - 1) * this.itemsPerPage + 1);
    const toNumberLine: number = this.existsNextPage ? this.itemsPerPage * this.currentPage : this.totalLength;

    this.relativePageText = `${fromNumberLine}-${toNumberLine} of ${this.totalLength}`;
  }
}
