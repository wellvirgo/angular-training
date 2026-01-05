import { Component } from '@angular/core';
import { Button } from "../button/button";

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  handleLogout() {
    alert('Processing logout...');
  }
}
