import { Component, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HelloWorldService } from '../../services/hello-world.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  name = 'Guio ';
  cont = signal(0);
  value = true;
  catURL =
    'https://www.infoescola.com/wp-content/uploads/2010/12/Gato-Bombaim_774381946.jpg';
  lista = ['Maça', 'Laranja', 'Banana'];
  catFacts: any[] = [];

  teste() {
    this.cont.update((cont) => cont + 1);

    console.log('OK');
  }

  constructor(private service: HelloWorldService) {
    this.service.getHelloWorld().subscribe({
      next: (data) => {
        this.catFacts = data;
        console.log(this.catFacts);
      },
      error: (error) => {
        console.error('Erro ao obter fatos sobre gatos:', error);
      },
      complete: () => {
        console.log('Finalizou!!');
      },
    });
  }
}
