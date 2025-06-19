import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../interfaces/account.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-update-form',
  imports: [ReactiveFormsModule],
  templateUrl: './account-update-form.component.html',
  styleUrl: './account-update-form.component.css'
})
export class AccountUpdateFormComponent implements OnInit {

  @Input({ required: true }) accountUpdate!: Account

  ngOnInit(): void {
    console.log("FORMULAIRE UPDATE", this.accountUpdate)
  }

  accountForm = new FormGroup({
    userId: new FormControl(""),
    accountNumber: new FormControl("", Validators.minLength(5)),
    accountType: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    solde: new FormControl("", [Validators.required, Validators.min(0)]),
  })

  handleSubmit() { }



  // Logique d'affichage des erreurs sur le HTML
  accountNumberControls(controlName: string) {
    // return this.accountForm.controls[`${controlName}`]
    const control = this.accountForm.get(controlName)
    if (control) {
      return { errors: control.errors, touched: control.touched }
    } else return null
  }
  // Logique d'affichage des erreurs sur le HTML
  get errorAccountTypeRequired() {
    const errors = this.accountNumberControls("accountType")?.errors
    if (errors) {
      return errors["required"]
    } else return false
  }

  // Logique d'affichage des erreurs sur le HTML
  get errorAccountTypeMaxLength() {
    const errors = this.accountNumberControls("accountType")?.errors
    if (errors) {
      return errors["maxlength"]
    } else return false
  }


}
