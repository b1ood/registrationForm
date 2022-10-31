import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../login-form/userServise/user.service";
import {User} from "../login-form/userServise/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {

  @ViewChild('username') usernameField: ElementRef;
  @ViewChild('password') passwordField: ElementRef;
  @ViewChild('privacy') privacy: ElementRef;
  @ViewChild('age') age: ElementRef;
  @ViewChild('preloader') preloader: ElementRef;
  @ViewChild('mainForm') mainForm: ElementRef;
  @ViewChild('warning') warning: ElementRef;

  public userCreateForm: FormGroup;
  public isName: boolean;
  public isPass: boolean;
  public isAgreePrivacy = false;
  public isAgreeAge = false;
  public user: User = new User('', '');
  public loadData: boolean;
  public status: string;
  public isRegistered: boolean;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this._createForm();
  }

  ngOnInit(): void {
  }

  public _createForm() {
    this.userCreateForm = this.formBuilder.group({
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
    return this.userCreateForm.get('userName');
  }

  get _userPassword() {
    return this.userCreateForm.get('userPassword');
  }

  createUser(user: User) {
    this.userService.userRegistration(user)
      .subscribe(resp => {
        if (resp.body === 100) {
          this.isRegistered = true;
          this.warning.nativeElement.style.top = '10px';
          this.status = 'This username already exists';
          setTimeout(() => {
            this.warning.nativeElement.style.top = '-100px';
          }, 2500)
        } else {
          this.loadData = !this.loadData;
          this.mainForm.nativeElement.style.opacity = '.5';
          localStorage.setItem('newUser', 'true');
          setTimeout(() => {
            location.href = '/'
          }, 800)
        }
      });
  }

  checkUserInfo() {
    if (this._userName?.untouched) {
      this.isName = true;
    }

    if (this._userPassword?.untouched) {
      this.isPass = true;
    }

    if (!this.isAgreePrivacy) {
      this.privacy.nativeElement.style.color = 'red';
      this.privacy.nativeElement.style.transition = '0.7s';
      setTimeout(() => {
        this.privacy.nativeElement.style.color = 'black';
        this.privacy.nativeElement.style.transition = '0.7s';
      }, 1000);
    }

    if (!this.isAgreeAge) {
      this.age.nativeElement.style.color = 'red';
      this.age.nativeElement.style.transition = '0.7s';
      setTimeout(() => {
        this.age.nativeElement.style.color = 'black';
        this.age.nativeElement.style.transition = '0.7s';
      }, 1000);
    }

    if (!this._userName?.valid || !this._userPassword?.valid || !this.isAgreePrivacy || !this.isAgreeAge) {
      return;
    }

    this.createUser(this.user);
  }
}
