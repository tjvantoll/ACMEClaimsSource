import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { NativeChatConfig } from "@progress-nativechat/nativescript-nativechat";

@Component({
  selector: 'app-profile',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  moduleId: module.id,
})
export class StatsComponent implements OnInit {

  nativeChatConfig: NativeChatConfig;

  constructor(private page: Page) {
    this.page.backgroundSpanUnderStatusBar = true;
  }

  ngOnInit() {
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;
    this.nativeChatConfig = {
      bot: {
        id: "c851cbd708574ea2b436daaa"
      },
      channel: {
        id: "970f87de-b15a-461a-978c-01da22eef503",
        token: "0e6be5d0-a06d-4be9-b496-09f057d2aabe"
      },
      session: {
        clear: true,
        userMessage: "I’d like to check the status of a shipment"
      }
    }
  }

}
