import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appPreventEnterSubmitForm]'
})
export class PreventEnterSubmitFormDirective {

  constructor() { }

  @HostListener('keydown.enter', ['$event']) onEnterKeyDownEventHandler(event)
  {
    if (event.currentTarget.tagName === 'FORM')
    {
      event.preventDefault();
    }
  }
}
