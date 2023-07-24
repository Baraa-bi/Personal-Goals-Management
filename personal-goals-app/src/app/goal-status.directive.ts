import { Directive, ElementRef, Input } from '@angular/core';
import { IStep } from './goal.service';
@Directive({
  selector: '[appGoalStatus]',
})
export class GoalStatusDirective {
  @Input() date!: number;
  @Input() steps!: IStep[];
  constructor(private goal: ElementRef) {}
  ngOnInit() {
    if (new Date().getTime() > this.date) {
      this.goal.nativeElement.innerHTML = `Behind`;
      this.goal.nativeElement.className =
        'bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900';
    } else if (!this.steps.length) {
      this.goal.nativeElement.innerHTML = `No Steps`;
      this.goal.nativeElement.className =
        'bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300';
    } else {
      let completed = this.steps.every(
        (step: IStep) => step.status === 'completed'
      );
      let inProgress = this.steps.some(
        (step: IStep) => step.status === 'in-progress'
      );
      let notStarted = this.steps.every(
        (step: IStep) => step.status === 'not-started'
      );
      if (completed) {
        this.goal.nativeElement.innerHTML = `Completed`;
        this.goal.nativeElement.className =
          'bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900';
      }
      if (inProgress) {
        this.goal.nativeElement.innerHTML = `In-Progress`;
        this.goal.nativeElement.className =
          'bg-orange-100 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900';
      }
      if (notStarted) {
        this.goal.nativeElement.innerHTML = `Not-Started`;
        this.goal.nativeElement.className =
          'bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900';
      }
    }
  }
}
