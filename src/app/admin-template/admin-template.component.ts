import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";



@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

  constructor(public authService : AuthenticationService, private router : Router ){ }


  handleLogout() {
    this.authService.logout().subscribe(  {

      next : (data)=> {
        this.router.navigateByUrl("/login");
      }
    });
  }
}
