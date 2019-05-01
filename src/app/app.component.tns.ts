import { Component } from "@angular/core";
import * as connectivity from "tns-core-modules/connectivity";
import { Toasty } from "nativescript-toasty";

import { BackendService } from "./backend.service";
import { Router } from "./utils";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private service: BackendService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    console.log("do I make it here?");

  }
}
