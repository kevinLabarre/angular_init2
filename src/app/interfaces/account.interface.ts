export interface Account {
  id?: number,  // ? = optionnel
  userId: number,
  accountNumber: string,
  accountType: string,
  solde: number,
  lastTransactionDate: string
}
