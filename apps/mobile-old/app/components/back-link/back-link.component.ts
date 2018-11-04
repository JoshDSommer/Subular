import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackLinkComponent implements OnInit {
  @Input() text: string;
  @Input() link: string[];
  constructor() {}

  ngOnInit() {}
}
