import {AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./userServise/user.service";
import {User} from "./userServise/user";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, DoCheck {

  @ViewChild('password') passwordField: ElementRef;
  @ViewChild('showPassword') isShownButton: ElementRef;
  @ViewChild('privacy') privacy: ElementRef;
  @ViewChild('age') age: ElementRef;
  @ViewChild('warning') warning: ElementRef;

  public userForm: FormGroup;
  public user: User = new User('', '');
  public isName: boolean;
  public isPass: boolean;
  private isReg: boolean;
  private pass: boolean;
  public status: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this._createForm();
  }

  submit(user: User) {
    this.userService.postData(user)
      .subscribe({
        next: (data: any) => {
          console.log(data)
          this.isReg = data.body.isReg;
          this.pass = data.body.pass;

          if (this.isReg && this.pass) {

          } else if (this.isReg && !this.pass) {
            this.warning.nativeElement.style.top = '10px'
            this.status = 'This password is wrong. Try again';
            setTimeout(() => {
              this.warning.nativeElement.style.top = '-100px'
            }, 2500)
          }
        },
        error: error => {
          if (error.status === 401) {
            this.warning.nativeElement.style.top = '10px'
            this.status = 'This user does not exist';
            setTimeout(() => {
              this.warning.nativeElement.style.top = '-100px'
            }, 2500)
          }
        }
      });
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
        this.warning.nativeElement.style.top = '10px'
        this.status = 'You have been successfully registered'
      }, 200)
      setTimeout(() => {
        this.warning.nativeElement.style.top = '-100px';
      }, 3000)
    }
    localStorage.clear();
  }

  changePasswordInp() {
    if (this.passwordField.nativeElement.getAttribute('type') === 'password') {
      this.passwordField.nativeElement.setAttribute('type', 'text');
      this.isShownButton.nativeElement.style.textDecoration = 'none';
    } else {
      this.passwordField.nativeElement.setAttribute('type', 'password');
      this.isShownButton.nativeElement.style.textDecoration = 'line-through'
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
      return
    }
    this.submit(this.user);
  }
}
