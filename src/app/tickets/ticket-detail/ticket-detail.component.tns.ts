import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { Page } from "tns-core-modules/ui/page";

import { BackendService } from "../../backend.service";
import { ColorUtility } from "../../utils/colors";
import { Toasty } from "nativescript-toasty";

@Component({
  selector: "app-details",
  templateUrl: "./ticket-detail.component.html",
  styleUrls: ["./ticket-detail.component.css"],
  moduleId: module.id
})
export class TicketDetailComponent implements OnInit {
  ticket;

  @ViewChild(RadSideDrawerComponent, null)
  public drawerComponent: RadSideDrawerComponent;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private page: Page,
    private zone: NgZone
  ) {
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params["id"];

    this.zone.run(() => this.loadData(id));
  }

  loadData(id: string) {
    this.backendService
      .getTicketById(id)
      .subscribe(ticket => (this.ticket = ticket));
  }

  onOpenDrawerTap() {
    this.drawerComponent.sideDrawer.showDrawer();
  }
  onCloseDrawerTap() {
    this.drawerComponent.sideDrawer.closeDrawer();
  }

  async changeStatus(status) {
    try {
      this.ticket.Status = status;
      await this.backendService.editTicketStatus(this.ticket);
    } catch (e) {
      console.log(e);
    } finally {
      this.drawerComponent.sideDrawer.closeDrawer();
      const toast = new Toasty({ text: "Status Updated" });
      toast.show();
    }
  }

  getStatusColor(status) {
    return ColorUtility.getStatusColor(status);
  }
}
