import {Component, OnInit} from '@angular/core';
import {UserService} from "../login-form/userServise/user.service";
import {User} from "../login-form/userServise/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {

  public userCreateForm: FormGroup;
  public isName: boolean;
  public isPass: boolean;
  public isRegistered: boolean;
  public loadData: boolean;

  public isAgreePrivacy = false;
  public isAgreeAge = false;

  public user: User = new User('', '');

  public mainFormOpacity: string;
  public privacyColor: string;
  public ageColor: string;
  public title: string;
  public status: string;
  public titleColor: string;
  public warning: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this._createForm();
  }

  ErrorClass(title = 'Warning', status: string,
             titleColor = '#ff4848', warning = '10px') {
    this.title = title;
    this.status = status;
    this.titleColor = titleColor;
    this.warning = warning;
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
          this.ErrorClass(this.title, status = 'This username already exists.',
            this.titleColor, this.warning);
          setTimeout(() => {
            this.warning = '-100px';
          }, 2500)
        } else {
          this.loadData = !this.loadData;
          this.mainFormOpacity = '.5';
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
      this.privacyColor = 'red';
      setTimeout(() => {
        this.privacyColor = 'black';
      }, 1000);
      }

    if (!this.isAgreeAge) {
      this.ageColor = 'red';
      setTimeout(() => {
        this.ageColor = 'black';
      }, 1000);
    }

    if (!this._userName?.valid || !this._userPassword?.valid || !this.isAgreePrivacy || !this.isAgreeAge) {
      return;
    }

    this.createUser(this.user);
  }
}
