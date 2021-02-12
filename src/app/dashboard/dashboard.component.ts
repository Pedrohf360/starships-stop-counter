import { AfterViewInit, Component, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IStarship } from '../core/model/starship.interface';
import { StarWarsService } from '../core/star-wars.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  userInputMGLT: number;
  searchChangeEmitter: EventEmitter<string> = new EventEmitter();

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

  queryField: FormControl = new FormControl();

  constructor(
    public starWarsService: StarWarsService
  ) {
  }

  ngAfterViewInit() {
    this.setStartshipsData();

    this.queryField.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((searchText: string) => this.applyFilter(searchText));
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

  async applyFilter(starshipModelName: string) {
    this.starWarsService.searchStarships(starshipModelName, this.currentPage)
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

  getMGLTValue(inputValueMGLT: number) {
    this.starShipsData = [];
    this.userInputMGLT = inputValueMGLT;

    this.queryField.setValue('');
    this.setPage(1);
  }

  setPage(pageNumber: number) {
    if (this.isChangingPage) {
      return;
    }

    this.currentPage = pageNumber;
    this.setStartshipsData()
  }

  canChangePage(direction: string): boolean {
    if (this.isChangingPage) {
      return false;
    }

    return direction === 'prev' ? this.existsPreviousPage : this.existsNextPage;
  }

  changePage(direction: string) {
    if (!this.canChangePage(direction)) {
      return;
    }

    if (direction === 'prev') {
      this.currentPage--;
    } else {
      this.currentPage++;
    }

    this.isChangingPage = true;

    if (this.queryField.value) {
      this.applyFilter(this.queryField.value);
      return;
    }

    this.setStartshipsData()
  }

  setRelativePageString() {
    const fromNumberLine: number = !this.existsPreviousPage ? 1 : ((this.currentPage - 1) * this.itemsPerPage + 1);
    const toNumberLine: number = this.existsNextPage ? this.itemsPerPage * this.currentPage : this.totalLength;

    this.relativePageText = `${fromNumberLine}-${toNumberLine} of ${this.totalLength}`;
  }
}
