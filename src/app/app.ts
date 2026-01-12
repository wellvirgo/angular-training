import { TuiRoot, TuiButton } from "@taiga-ui/core";
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/header/header";
import { AuthService } from "./core/service/auth/auth-service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pmh-component-train');
  protected isAuthenticated = inject(AuthService).isAuthenticated;
}
