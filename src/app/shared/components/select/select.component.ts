import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface SelectItem {
  name: string;
  value: any;
}

@Component({
  selector: 'vl-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() placeholder: string = 'Select an option';
  @Input() items: Array<SelectItem>;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  itemSelected: SelectItem;
  showItems = false;

  constructor() {}

  ngOnInit(): void {
    if (this.value !== undefined) {
      this.itemSelected = this.items.find((i) => i.value === this.value);
    }
  }

  selectItem(item: SelectItem) {
    if (this.itemSelected === item) {
      this.showItems = false;
      return;
    }
    this.itemSelected = item;
    this.value = this.itemSelected.value;
    this.valueChange.emit(this.value);
    this.showItems = false;
  }
}
