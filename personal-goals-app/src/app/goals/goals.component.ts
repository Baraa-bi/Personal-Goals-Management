import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoalService, IGoal } from '../goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  goals!: Array<IGoal>;
  goalProgress: number = 34;
  constructor(private _goalService: GoalService) {}
  ngOnInit(): void {
    this.getGoals();
  }
  getGoals() {
    this._goalService.getGoals().subscribe((goals) => {
      this.goals = goals;
    });
  }
}
