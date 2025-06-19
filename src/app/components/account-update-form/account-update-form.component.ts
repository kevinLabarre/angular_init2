import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Account } from '../../interfaces/account.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-account-update-form',
  imports: [ReactiveFormsModule],
  templateUrl: './account-update-form.component.html',
  styleUrl: './account-update-form.component.css'
})
export class AccountUpdateFormComponent implements OnChanges {

  @Input({ required: true }) accountUpdate!: Account

  @Output() handleUpdateAccount: EventEmitter<Account> = new EventEmitter()

  service = inject(AccountService)

  accountForm = new FormGroup({
    id: new FormControl({ value: "", disabled: true }),
    userId: new FormControl(""),
    accountNumber: new FormControl("", Validators.minLength(5)),
    accountType: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    solde: new FormControl("", [Validators.required, Validators.min(0)]),
    lastTransactionDate: new FormControl("")
  })

  // ngOnChanges sert à surveiller les changement de valeur d'une input
  ngOnChanges(changes: SimpleChanges): void {
    // Ce qui est dans le if, sera relancé à chaque changement de valeur de accountUpdate (notre @Input())
    if (changes["accountUpdate"]) {
      const a = {
        ...this.accountUpdate,
        id: String(this.accountUpdate.id),// Conversion en String
        userId: String(this.accountUpdate.userId), // Conversion en String
        solde: String(this.accountUpdate.solde) // Conversion en String
      }

      // Pour pré-remplissage du formulaire
      this.accountForm.setValue(a)
    }
  }


  handleSubmit() {

    console.log(this.accountForm.value)

    if (this.accountForm.valid) {
      // Ajouter la logique pour la mise à jour
      const updatedAccount = {
        id: this.accountUpdate.id,
        userId: Number(this.accountForm.value.userId),
        solde: Number(this.accountForm.value.solde),
        accountNumber: this.accountForm.value.accountNumber || "",
        accountType: this.accountForm.value.accountType || "",
        lastTransactionDate: this.accountForm.value.lastTransactionDate || "",
      }

      this.service.updateAccount(updatedAccount).subscribe({
        next: (resp) => this.handleUpdateAccount.emit(resp),
        error: (e) => console.error(e.message)
      })
      this.accountForm.reset();
    }
  }


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
