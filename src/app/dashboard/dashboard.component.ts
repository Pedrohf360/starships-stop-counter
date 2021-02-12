import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IStarship } from '../core/model/starship.interface';
import { StarWarsService } from '../core/star-wars.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  userInputMGLT: number;

  displayedColumns: string[] = ['name', 'consumables', 'MGLT', 'totalStops'];
  dataSource: MatTableDataSource<IStarship>;
  public starShipsData = [];

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
    this.starWarsService.getStarshipsData(this.currentPage)
      .then((res: any) => {
        this.existsNextPage = typeof res.next === 'string';
        this.existsPreviousPage = typeof res.previous === 'string';

        this.totalLength = res.count;
        this.starShipsData = res.results;

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
    this.dataSource = new MatTableDataSource(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.setPage(1);
  }

  getMGLTValue(inputValueMGLT: number) {
    this.starShipsData = [];
    this.userInputMGLT = inputValueMGLT;

    this.setPage(1);
  }

  setPage(pageNumber: number) {
    if (this.isChangingPage) {
      return;
    }

    this.currentPage = pageNumber;
    this.setStartshipsData()
  }

  previousPage() {
    if (this.isChangingPage || !this.existsPreviousPage) {
      return;
    }

    this.isChangingPage = true;
    this.currentPage--;
    this.setStartshipsData()
  }

  nextPage() {
    if (this.isChangingPage || !this.existsNextPage) {
      return;
    }

    this.isChangingPage = true;
    this.currentPage++;
    this.setStartshipsData()
  }

  setRelativePageString() {
    const fromNumberLine: number = !this.existsPreviousPage ? 1 : ((this.currentPage - 1) * this.itemsPerPage + 1);
    const toNumberLine: number = this.existsNextPage ? this.itemsPerPage * this.currentPage : this.totalLength;

    this.relativePageText = `${fromNumberLine}-${toNumberLine} of ${this.totalLength}`;
  }
}
