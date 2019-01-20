import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gutter',
  templateUrl: 'gutter.component.html',
  styleUrls: ['gutter.component.css']
})
export class GutterComponent {
  @Input()
  percent: string;
}
