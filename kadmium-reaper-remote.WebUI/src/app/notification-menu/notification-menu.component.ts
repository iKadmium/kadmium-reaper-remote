import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from "../services/notifications.service";

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
    }

}
