import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Response } from "@angular/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NotificationsService } from "../notifications.service";
import { StatusCode } from "../status-code.enum";
import { Status } from "../status";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
    selector: 'app-message-bar',
    templateUrl: './message-bar.component.html',
    styleUrls: ['./message-bar.component.css']
})
export class MessageBarComponent implements OnInit
{
    private activeMessage: Status;
    public messagesCollapsed: boolean;

    constructor(private sanitizer: DomSanitizer, private notificationsService: NotificationsService, public toastr: ToastsManager, vcr: ViewContainerRef)
    {
        this.messagesCollapsed = true;
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(): void
    {

    }

    public toggleCollapse(): void
    {
        this.messagesCollapsed = !this.messagesCollapsed;
    }

    private remove(status: Status)
    {
        let index = this.notificationsService.messages.indexOf(status);
        this.notificationsService.messages.splice(index, 1);
    }

    public removeAll()
    {
        this.notificationsService.messages = [];
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

    public getMessages(): Status[]
    {
        return this.notificationsService.messages;
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
