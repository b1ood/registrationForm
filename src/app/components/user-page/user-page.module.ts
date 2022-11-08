import {NgModule} from '@angular/core';
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PersonalDataComponent,
  ],
    imports: [
        ReactiveFormsModule
    ],
  exports: [
    PersonalDataComponent
  ],
  providers: []
})

export class UserPageModule{

}
