import { Component, inject, Input, OnInit } from '@angular/core';
import { Account } from '../../interfaces/account.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-account-update-form',
  imports: [ReactiveFormsModule],
  templateUrl: './account-update-form.component.html',
  styleUrl: './account-update-form.component.css'
})
export class AccountUpdateFormComponent implements OnInit {

  @Input({ required: true }) accountUpdate!: Account

  service = inject(AccountService)

  accountForm = new FormGroup({
    id: new FormControl({ value: "", disabled: true }),
    userId: new FormControl(""),
    accountNumber: new FormControl("", Validators.minLength(5)),
    accountType: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    solde: new FormControl("", [Validators.required, Validators.min(0)]),
    lastTransactionDate: new FormControl("")
  })


  ngOnInit(): void {
    const a = {
      ...this.accountUpdate,
      id: String(this.accountUpdate.id),// Conversion en String
      userId: String(this.accountUpdate.userId), // Conversion en String
      solde: String(this.accountUpdate.solde) // Conversion en String
    }

    // Pour pré-remplissage du formulaire
    this.accountForm.setValue(a)
  }

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
