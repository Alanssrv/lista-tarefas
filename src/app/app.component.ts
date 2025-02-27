import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<p>ALAN</p> <router-outlet />`,
})
export class AppComponent {
  title = 'lista-tarefas';
}
