import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCheckDate]',
})
export class CheckDateDirective {
  @Input() date!: number;
  @Input() status!: string;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    if (this.status !== 'completed' && new Date().getTime() > this.date) {
      this.el.nativeElement.innerHTML = `Out Dated`;
      this.el.nativeElement.style = 'display:inline;padding:3px 13px';
    }
  }
}
