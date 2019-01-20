import { Directive, ElementRef, Input } from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view';
import { Animation, AnimationDefinition } from 'tns-core-modules/ui/animation';
import { Color } from 'tns-core-modules/color/color';
import {
  TouchAction,
  TouchGestureEventData
} from 'tns-core-modules/ui/gestures/gestures';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  @Input()
  highlight: string;

  get view(): View {
    return this.element.nativeElement;
  }

  private originalBackgroundColor: string | Color;
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.originalBackgroundColor = this.view.backgroundColor;

    const onTouch = ($event: TouchGestureEventData) => {
      if ($event.action === TouchAction.down) {
        this.view.backgroundColor = this.highlight;
      }
      if (
        $event.action === TouchAction.cancel ||
        $event.action === TouchAction.up
      ) {
        this.view.backgroundColor = this.originalBackgroundColor;
      }
    };

    this.view.on('touch', onTouch);
  }

  ngOnDestroy() {}
}
