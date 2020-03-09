import { Component, OnInit, NgZone } from "@angular/core";
import { BackendService } from "../../backend.service";
@Component({
  selector: "app-tickets",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"]
})
export class TicketsComponent implements OnInit {
  tickets;
  pieData;
  constructor(private zone: NgZone, private backendService: BackendService) {}
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.backendService.getTickets().subscribe(data => {
      this.zone.run(() => {
        this.tickets = data;
        this.processPieData();
      });
    });
  }
  private processPieData() {
    let data = this.tickets;
    this.pieData = [
      {
        category: "In Transit",
        value: data.filter(i => i.Status === "In Transit").length / data.length
      },
      {
        category: "Processing",
        value: data.filter(i => i.Status === "Processing").length / data.length
      },
      {
        category: "Shipped",
        value: data.filter(i => i.Status === "Shipped").length / data.length
      }
    ];
  }
  async setStatus(ticket, status) {
    ticket.Status = status;
    await this.backendService.editTicketStatus(ticket);
    this.processPieData();
  }
}
