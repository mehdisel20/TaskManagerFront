import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `<h2 class="text-danger">404 - Page non trouvée</h2>
             <a routerLink="/" class="btn btn-primary mt-3">Retour à l'accueil</a>`,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
