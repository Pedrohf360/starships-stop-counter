import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StarWarsService } from '../core/star-wars.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public searchForm: FormGroup;
  public searchFormFields: any;
  @Output() searchEvent = new EventEmitter<number>();

  constructor(
    public starWarsService: StarWarsService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchFormFields = {
      MGLT: ['']
    };
    this.searchForm = this.fb.group(this.searchFormFields);
  }

  sendOuputValue() {
    if (!this.searchForm.value.MGLT) {
      return;
    }

    let MGLTValue;
    MGLTValue = this.searchForm.value.MGLT;

    this.searchEvent.emit(MGLTValue);
  }
}
