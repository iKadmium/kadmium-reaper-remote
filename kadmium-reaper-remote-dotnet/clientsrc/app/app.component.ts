import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { MessageBarComponent } from "./message-bar/message-bar.component";
import { NotificationsService } from "./notifications.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy
{
    @ViewChild("messageBar") messageBar: MessageBarComponent;

    constructor(public titleService: Title, private notificationService: NotificationsService)
    {

    }

    ngOnInit(): void
    {
        this.notificationService.component = this.messageBar;
    }

    ngOnDestroy(): void
    {
        document.body.appendChild(document.createElement("app"));
    }
}
