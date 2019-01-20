import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'subular-brand',
  templateUrl: 'subular-brand.component.html',
  styleUrls: ['subular-brand.component.css']
})
export class SubularBrandComponent {
  constructor(ref: ChangeDetectorRef) {
    ref.detach();
  }
}
