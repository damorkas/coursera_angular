import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishcopy: Dish;

  comment: Comment;
  commentForm: FormGroup;

  @ViewChild('cform') commentFormDirective: any;

  formErrors = {
    author: '',
    comment: ''
  };

  validationMessages = {
    author: {
      required: 'Author Name is required.',
      minlength: 'Author Name must be at least 2 characters long.'
    },
    comment: {
      required: 'Comment is required.'
    }
  };

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService
      .getDishIds()
      .subscribe(dishIds => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
        },
        errmess => (this.errMess = <any>errmess)
      );
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, Validators.required],
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any): void {
    if (!this.commentForm) {
      return;
    }

    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    this.comment = this.commentForm.value;

    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);

    this.dishService.putDish(this.dishcopy).subscribe(
      dish => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      errmess => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errmess;
      }
    );

    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  setPrevNext(dishId: string): void {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}
