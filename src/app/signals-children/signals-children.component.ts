import { Component, effect, input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-signals-children',
  imports: [],
  templateUrl: './signals-children.component.html',
  styleUrl: './signals-children.component.css'
})
export class SignalsChildrenComponent {

  // count est un signal
  // count = input<number>(0);

  // Pour une input "required"
  count = input.required<number>();

  times: WritableSignal<number> = signal(0)

  constructor() {
    effect(() => {
      const a = this.count()
      this.times.update(prev => prev + 1)
    })
  }


}
