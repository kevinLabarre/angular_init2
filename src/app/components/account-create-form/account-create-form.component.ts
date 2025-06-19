import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../interfaces/account.interface';

@Component({
  selector: 'app-account-create-form',
  imports: [ReactiveFormsModule],
  templateUrl: './account-create-form.component.html',
  styleUrl: './account-create-form.component.css'
})
export class AccountCreateFormComponent {

  service = inject(AccountService)

  @Output() accountCreated: EventEmitter<Account> = new EventEmitter();

  accountForm = new FormGroup({
    userId: new FormControl(""),
    accountNumber: new FormControl("", Validators.minLength(5)),
    accountType: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    solde: new FormControl("", [Validators.required, Validators.min(0)]),
  })

  handleSubmit() {
    if (this.accountForm.valid) {

      // Ok en Javascript, pas en typescript psq les types ne correspondent pas strictement (certaines valeurs du formulaire peuvent etre undefined)
      // const newAccount: Account = { ...this.accountForm.value, lastTransactionDate: String(new Date()) }

      const resultForm = this.accountForm.value

      const newAccount: Account = {
        userId: Number(resultForm.userId),
        accountNumber: resultForm.accountNumber || "",
        accountType: resultForm.accountType || "",
        solde: Number(resultForm.solde),
        lastTransactionDate: String(new Date())
      }

      this.service.addAccount(newAccount).subscribe(resp => {
        this.accountCreated.emit(resp)
        this.accountForm.reset()
      })
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
