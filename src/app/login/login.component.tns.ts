import { Component } from "@angular/core";
import { NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";

import { BackendService } from "../backend.service";

@Component({
  selector: "Login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  name = "";
  password = "";
  isIOS = isIOS;
  isAndroid = isAndroid;
  processing = false;
  private fingerprintAuth: FingerprintAuth;

  constructor(
    private _routerExtensions: RouterExtensions,
    private zone: NgZone,
    private page: Page,
    private backendService: BackendService
  ) {
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;
    this.fingerprintAuth = new FingerprintAuth();
  }

  async login() {
    this.processing = true;
    try {
      await this.backendService.login(this.name, this.password);
      this.processing = false;
      this.navigateToTickets();
    } catch (error) {
      this.processing = false;
      alert("An error occurred. Check your Kinvey settings.");
      console.log("error: " + error);
    }
  }

  async loginWithMIC() {
    try {
      const user = await this.backendService.loginWithMIC("sde://");
      this.navigateToTickets();
      console.log("user: " + JSON.stringify(user));
    } catch (error) {
      alert("An error occurred. Check your Kinvey settings.");
      console.log("error: " + error);
    }
  }

  private navigateToTickets() {
    this.zone.run(() => {
      this.fingerprintAuth.available().then(result => {
        if (result.any) {
          this.fingerprintAuth.verifyFingerprint({})
            .then(() => {
              this.navigate();
            });
        } else {
          this.navigate();
        }
      });
    });
  }

  private navigate() {
    this._routerExtensions.navigate(["/tickets"], {
      clearHistory: true,
      animated: true,
      transition: {
        name: "slideTop",
        duration: 350,
        curve: "ease"
      }
    });
  }
}
