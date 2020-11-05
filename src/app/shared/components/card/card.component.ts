import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vl-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
