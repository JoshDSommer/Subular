import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  HostListener,
  AfterViewInit,
  Output
} from '@angular/core';

@Directive({
  selector: '[jumpTo]'
})
export class TypeAndJumpToDirective implements AfterViewInit {
  private searchValue = '';
  private timeOut;

  @Input()
  jumpTo: any[];
  @Output()
  selected = new EventEmitter();
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.jumpTo) {
      const artist = this.searchWithDebounce(event.key);
    }
  }

  constructor(private element: ElementRef) {}

  searchWithDebounce(value) {
    clearTimeout(this.timeOut);
    this.searchValue = this.searchValue + value;
    this.timeOut = setTimeout(() => {
      const artist = this.getFirstArtistThatStartsWith(this.searchValue);
      this.scrollToItem(artist);
      this.searchValue = '';
    }, 500);
  }

  scrollToItem(listItem: any) {
    if (listItem) {
      const nativeHtmlUL = this.element.nativeElement as HTMLUListElement;
      const artistLI = nativeHtmlUL.querySelector(
        `[class='${listItem.id}']`
      ) as HTMLLIElement;
      nativeHtmlUL.scrollTop = artistLI.offsetTop - 100;
      artistLI.querySelector('a').click();
      this.selected.emit(listItem);
    }
  }

  getFirstArtistThatStartsWith(startsWith: string): any {
    return this.jumpTo.find(
      value =>
        value.name
          .toLowerCase()
          .replace('the ', '')
          .substr(0, startsWith.length) === startsWith.toLowerCase()
    );
  }

  ngAfterViewInit() {}
}
