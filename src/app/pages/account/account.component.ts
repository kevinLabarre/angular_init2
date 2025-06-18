import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../interfaces/account.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AccountCreateFormComponent } from "../../components/account-create-form/account-create-form.component";

@Component({
  selector: 'app-account',
  imports: [CurrencyPipe, DatePipe, AccountCreateFormComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  service = inject(AccountService);

  accounts?: Account[]

  displayCreateForm: boolean = false

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


}
