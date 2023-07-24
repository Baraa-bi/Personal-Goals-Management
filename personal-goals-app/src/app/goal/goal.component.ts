import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalService, IGoal } from '../goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent implements OnInit {
  goal!: IGoal;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _goalService: GoalService
  ) {}

  get goalId() {
    return this._activatedRoute.snapshot.params['goalId'];
  }

  getGoal() {
    this._goalService.getGoal(this.goalId).subscribe({
      next: (goal: IGoal) => (this.goal = goal),
    });
  }

  onDeleteGoal() {
    this._goalService.deleteGoal(this.goalId).subscribe({
      next: () => this._router.navigate(['goals']),
    });
  }

  onUpdateGoal() {
    this._router.navigate(['update-goal/' + this.goal._id]);
  }

  ngOnInit(): void {
    this.getGoal();
  }
}
