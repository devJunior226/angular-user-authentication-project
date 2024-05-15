import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {}

  onLogout() {
    sessionStorage.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: "Y're logged out !",
    });
    this.router.navigate(['login']);
  }
}
