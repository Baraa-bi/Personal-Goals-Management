import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { IStep } from './goal.service';

@Directive({
  selector: '[appGoalProgress]',
})
export class GoalProgressDirective implements OnInit {
  @Input() steps!: any;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    let steps = this.steps ?? [];
    let totalStepsCount = steps.length || 1;
    let completedSteps = steps.filter(
      (s: IStep) => s?.status === 'completed'
    ).length;
    let value = Math.round((completedSteps * 100) / totalStepsCount);
    if (value > 0) {
      this.el.nativeElement.innerHTML = `${value}%`;
      this.el.nativeElement.style.width = `${value}%`;
    } else {
      this.el.nativeElement.innerHTML = `${value}%`;
      this.el.nativeElement.style.width = `${20}%`;
    }
  }
}
