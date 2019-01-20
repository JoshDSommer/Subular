import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { SubularRouteData } from '../../app.routing';

@Component({
  moduleId: module.id,
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  row: number;
  @Input()
  col: number;

  @Input()
  data: SubularRouteData;

  constructor() {}

  ngOnInit() {}
}
