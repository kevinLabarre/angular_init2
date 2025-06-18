import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-create-form',
  imports: [ReactiveFormsModule],
  templateUrl: './account-create-form.component.html',
  styleUrl: './account-create-form.component.css'
})
export class AccountCreateFormComponent {

  accountForm = new FormGroup({
    userId: new FormControl(""),
    accountNumber: new FormControl("", Validators.minLength(5)),
    accountType: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    solde: new FormControl("", [Validators.required, Validators.min(0)]),
  })

  handleSubmit() {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value)
    } else {
      console.log("Erreur dans le remplissage du formulaire")
    }
  }


  handleTest() {
    console.log("HANDLE TEST déclenché !!")
  }

  accountNumberControls(controlName: string) {
    // return this.accountForm.controls[`${controlName}`]
    const control = this.accountForm.get(controlName)
    if (control) {
      return { errors: control.errors, touched: control.touched }
    } else return null
  }

  get errorAccountTypeRequired() {
    const errors = this.accountNumberControls("accountType")?.errors
    if (errors) {
      return errors["required"]
    } else return false
  }

  get errorAccountTypeMaxLength() {
    const errors = this.accountNumberControls("accountType")?.errors
    if (errors) {
      return errors["maxlength"]
    } else return false
  }

}






// /errors renvoie un objet semblabe à celui ci-dessous :
// { required: true, maxLength: true  }
