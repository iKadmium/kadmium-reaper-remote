import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { NotificationsService } from "../notifications.service";
import { Status } from "../status";

@Component({
    selector: 'app-notification-menu',
    templateUrl: './notification-menu.component.html',
    styleUrls: ['./notification-menu.component.css']
})
export class NotificationMenuComponent implements OnInit
{
    private activeMessage: Status;

    constructor(public notificationsService: NotificationsService, private sanitizer: DomSanitizer, public toastr: ToastsManager, vcr: ViewContainerRef)
    {
        this.toastr.setRootViewContainerRef(vcr);
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

}
