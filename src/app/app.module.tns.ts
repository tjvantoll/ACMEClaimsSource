import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeChatModule } from "@progress-nativechat/nativescript-nativechat/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { TicketsModule } from "./tickets/tickets.module";
import { EquipmentModule } from "./equipment/equipment.module";
import { ProfileModule } from "./profile/profile.module";
import { StatsModule } from "./stats/stats.module";
import { BackendService } from "./backend.service";
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";
import { KinveyModule } from "kinvey-nativescript-sdk/angular";

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardLayoutComponent],
  imports: [
    NativeScriptModule,
    NativeChatModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    TicketsModule,
    EquipmentModule,
    ProfileModule,
    StatsModule,
    KinveyModule.init({
      appKey: "kid_rkDJUINIQ",
      appSecret: "17282f9d91da4af7b398855e32ea4dd0"
    })
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
