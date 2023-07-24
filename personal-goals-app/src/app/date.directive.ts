import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDate]',
})
export class DateDirective {
  @Input() deadLine!: any;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    setTimeout(() => {
      if (!isNaN(this.deadLine)) {
        this.el.nativeElement.valueAsDate = new Date(this.deadLine);
      }
    }, 100);
  }
}
