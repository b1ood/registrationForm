import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[appColorize]'
})
export class ColorizeDirective {

  @HostBinding('style.color') color: string;

  constructor() {
    setInterval(() => {
      this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }, 500)
  }

}
