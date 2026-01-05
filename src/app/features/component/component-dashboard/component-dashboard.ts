import { Component } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { ComponentFilter } from "../component-filter/component-filter";

@Component({
  selector: 'app-component-dashboard',
  imports: [Button, ComponentFilter],
  templateUrl: './component-dashboard.html',
  styleUrl: './component-dashboard.css',
})
export class ComponentDashboard {

}
