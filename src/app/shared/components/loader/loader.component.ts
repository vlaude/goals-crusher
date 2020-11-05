import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vl-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() color: 'primary' | 'secondary' | 'default' = 'primary';

  constructor() {}

  ngOnInit(): void {}
}
