import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./userServise/user.service";
import {User} from "./userServise/user";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, DoCheck {

  public userForm: FormGroup;
  public user: User = new User('', '');
  public isName: boolean;
  public isPass: boolean;
  private isReg: boolean;
  private pass: boolean;

  public passField: string = 'password';
  public showPass: string;
  public title: string;
  public status: string;
  public titleColor: string;
  public warning: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this._createForm();
  }

  private ErrorClass(title = 'Warning', status: string,
             titleColor = '#ff4848', warning: string) {
    this.title = title;
    this.status = status;
    this.titleColor = titleColor;
    this.warning = warning;
  }

  submit(user: User) {
    this.userService.postData(user)
      .subscribe({
        next: (data: any) => {
          this.isReg = data.body.isReg;
          this.pass = data.body.pass;

          if (this.isReg && this.pass) {
            location.href = '/page'
          } else if (this.isReg && !this.pass) {
            this.ErrorClass(this.title, status = 'This password is wrong. Try again.',
              this.titleColor, this.warning = '10px');
            setTimeout(() => {
              this.warning = '-100px';
            }, 2500)
          }
        },
        error: error => {
          if (error.status === 401) {
            this.ErrorClass(this.title, status = 'This user does not exist',
              this.titleColor, this.warning = '10px');
            setTimeout(() => {
              this.warning = '-100px';
            }, 2500)
          }
        },
        complete: () => {

        }
      })
  }

  public _createForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[A-Za-z0-9]*')]
      ],
      userPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[A-Za-z0-9]*')]
      ],
    })
  }

  get _userName() {
    return this.userForm.get('userName');
  }

  get _userPassword() {
    return this.userForm.get('userPassword');
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (localStorage.getItem('newUser') === 'true') {
      setTimeout(() => {
        this.ErrorClass(this.title = 'Congratulation!', status = 'You have been successfully registered',
          this.titleColor = 'whitesmoke', this.warning = '10px');
      }, 200);
      setTimeout(() => {
        this.warning = '-100px';
      }, 3000);
    }
    localStorage.clear();
  }

  changePasswordInp() {
    if (this.passField === 'password') {
      this.passField = 'text';
      this.showPass = 'none';
    } else {
      this.passField = 'password';
      this.showPass = 'line-through';
    }
  }

  public checkValid() {

    if (this._userName?.untouched) {
      this.isName = true;
    }

    if (this._userPassword?.untouched) {
      this.isPass = true;
    }

    if (!this._userName?.valid || !this._userPassword?.valid) {
      return;
    }
    this.submit(this.user);
  }
}
