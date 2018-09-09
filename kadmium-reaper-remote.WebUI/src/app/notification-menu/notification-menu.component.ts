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
    private activeMessage: Status;

    constructor(public notificationsService: NotificationsService, private sanitizer: DomSanitizer, private modalService: NgbModal, dropdownConfig: NgbDropdownConfig)
    {
        dropdownConfig.placement = "bottom-right";
    }

    ngOnInit(): void
    {
        this.notificationsService.component = this;
    }

    private getBody(message: Status): SafeHtml
    {
        let body = message.details;
        let safeHTML = this.sanitizer.bypassSecurityTrustHtml(body);
        return safeHTML;
    }

    public getActiveMessageBody(): SafeHtml
    {
        if (this.activeMessage != null)
        {
            return this.getBody(this.activeMessage);
        }
        else
        {
            return this.sanitizer.bypassSecurityTrustHtml("No message");
        }
    }

    private isResponse(message: Status): boolean
    {
        return (message.details != null && message.details instanceof Response);
    }

    private iframeLoad(message: Status, index: number): void
    {
        this.activeMessage = message;
        let headerHeight = document.getElementById("modal-header").offsetHeight;
        headerHeight = headerHeight > 0 ? headerHeight : 64;
        let footerHeight = document.getElementById("modal-footer").offsetHeight;
        footerHeight = footerHeight > 0 ? footerHeight : 64;
        let paddingHeight = 110;
        let calculatedHeight = headerHeight + footerHeight + paddingHeight;
        let remainingHeight = window.innerHeight - calculatedHeight;
        let iframeRef = document.getElementById('error-details-iframe') as HTMLIFrameElement;
        iframeRef.style.height = remainingHeight + "px";
        iframeRef.contentWindow.document.write(this.getBody(message) as string);
    }

    private async showModal(modalDiv: any): Promise<void>
    {
        await this.modalService.open(modalDiv);
    }

}
