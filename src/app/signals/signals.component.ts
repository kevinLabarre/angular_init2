import { Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {

  constructor() {
    effect(() => document.title = "Mon compteur : " + this.count());
  }

  count: WritableSignal<number> = signal(0);

  countCarre = computed(() => this.count() * this.count())

  increment() {
    this.count.update((prev) => prev + 1);

    // A NE PAS REPRODUIRE
    // On ne doit pas utiliser la valeur de l'état précédent pour calculer la nouvelle valeur
    // this.count.set(this.count() + 1)
  }

  decrement() {
    this.count.update((prev) => prev - 1);
  }

  reset() {
    this.count.set(0);
  }

}
