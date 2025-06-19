import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../interfaces/account.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AccountCreateFormComponent } from "../../components/account-create-form/account-create-form.component";
import { AccountUpdateFormComponent } from "../../components/account-update-form/account-update-form.component";

@Component({
  selector: 'app-account',
  imports: [CurrencyPipe, DatePipe, AccountCreateFormComponent, AccountUpdateFormComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  service = inject(AccountService);

  accounts?: Account[]

  displayCreateForm: boolean = false
  displayUpdateForm: boolean = false

  accountUpdate?: Account

  ngOnInit(): void {
    this.service.getAccounts().subscribe({
      next: (response) => this.accounts = response,
      error: (e) => console.error(e.message)
    })
  }

  handleDelete(id: number) {
    this.service.deleteAccount(id).subscribe({
      next: (resp) => {
        if (this.accounts) {
          this.accounts = this.accounts.filter((item) => item.id !== resp.id)
        }
      },
      error: (e) => alert("ERREUR SUPPRESSION " + e.message)
    })
  }

  handleCreate() {
    this.displayCreateForm = true;
  }

  handleCreateNewAccount(account: Account) {
    if (this.accounts) {
      this.accounts = [...this.accounts, account]
    }
  }

  handleOpenFormUpdate(account: Account) {
    this.displayUpdateForm = true;
    this.accountUpdate = account
  }

  handleUpdateAccount(account: Account) {
    if (this.accounts) {
      // this.accounts = this.accounts?.map(a => {
      //   if (a.id === account.id) {
      //     return account
      //   } else return a
      // })

      this.accounts = this.accounts.map(a => a.id === account.id ? account : a)
    }


  }

}
