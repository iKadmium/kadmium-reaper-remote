import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";
import { NotificationsService } from "../notifications.service";
import { Status } from "../status";
import { NgbModal, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-notification-menu',
    templateUrl: './notification-menu.component.html',
    styleUrls: ['./notification-menu.component.css'],
    providers: [NgbModal, NgbDropdownConfig]
})
export class NotificationMenuComponent implements OnInit
{
    constructor(public notificationsService: NotificationsService, dropdownConfig: NgbDropdownConfig)
    {
        dropdownConfig.placement = "bottom-right";
    }

    ngOnInit(): void
    {
        this.notificationsService.component = this;
    }

}
