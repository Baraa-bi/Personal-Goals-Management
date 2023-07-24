import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalService, IGoal, IStep } from '../goal.service';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
})
export class GoalFormComponent implements OnInit {
  #goalForm!: FormGroup;
  submitted: boolean = false;

  get goalId() {
    return this._activatedRoute.snapshot.params['goalId'];
  }

  get goalForm() {
    return this.#goalForm;
  }

  get steps(): FormArray {
    return this.#goalForm.get('steps') as FormArray;
  }

  get goalFormControls() {
    return this.#goalForm.controls;
  }

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _goalService: GoalService,
    private _activatedRoute: ActivatedRoute
  ) {}

  getGoal() {
    if (this.goalId?.length)
      this._goalService.getGoal(this.goalId).subscribe({
        next: (goal: IGoal) => {
          goal.steps?.forEach((step: IStep) => {
            this.steps.push(
              this._formBuilder.group({
                title: step.title,
                status: step.status,
                deadline: step.deadline,
                description: step.description,
              })
            );
          });
          this.#goalForm.patchValue(goal);
        },
      });
  }

  ngOnInit(): void {
    this.getGoal();
    this.#goalForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: [new Date().getTime(), Validators.required],
      steps: this._formBuilder.array([]),
    });
  }

  onCreateGoal(): void {
    this.submitted = true;
    if (this.#goalForm.valid) {
      const goal = this.#goalForm.value;
      goal.deadline = new Date(goal.deadline).getTime();
      goal.steps?.forEach((step: IStep) => {
        step.deadline = new Date(step.deadline).getTime();
      });
      if (this.goalId) {
        this._goalService.updateGoal(this.goalId, goal).subscribe({
          next: () => {
            this._router.navigate(['goals/' + this.goalId]);
          },
        });
      } else {
        this._goalService.createGoal(goal).subscribe({
          next: (goalId: string) => {
            this._router.navigate(['goals/' + goalId]);
          },
        });
      }
    }
  }

  addStep() {
    const stepForm = this._formBuilder.group({
      title: 'Goal Step',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      status: 'not-started',
      deadline: new Date().getTime(),
    });
    this.steps.push(stepForm);
  }

  deleteStep(stepIndex: number) {
    this.steps.removeAt(stepIndex);
  }
}
