import { Component, OnInit } from '@angular/core';

import { Response } from "@angular/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Status, StatusCode } from "../status";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.css'],
  providers: [NotificationsService]
})
export class MessageBarComponent implements OnInit
{

  private messages: Status[];
  private activeMessage: Status;
  private messagesCollapsed: boolean;

  constructor(private sanitizer: DomSanitizer, private notificationsService: NotificationsService)
  {
    this.messages = [];
    this.messagesCollapsed = true;
  }

  ngOnInit(): void
  {

  }

  private remove(status: Status)
  {
    let index = this.messages.indexOf(status);
    this.messages.splice(index, 1);
  }

  private removeAll()
  {
    this.messages = [];
  }

  public add(statusCode: StatusCode, message: string): void
  {
    this.toast(statusCode, message);
    this.messages.push(new Status(statusCode, message));
  }

  public addError(reason: Response): void
  {
    let error = new Status("Error", reason.statusText);
    error.body = reason.text();
    this.toast("Error", reason.text());
    this.messages.push(error);
  }

  public toast(statusCode: StatusCode, message: string): void
  {
    switch (statusCode)
    {
      case "Success":
        this.notificationsService.success("Success", message);
        break;
      case "Error":
        this.notificationsService.error("Error", message);
        break;
      case "Unknown":
        this.notificationsService.info("Unknown", message);
        break;
      case "Warning":
        this.notificationsService.alert("Warning", message);
        break;
    }
  }

  private getBody(message: Status): SafeHtml
  {
    let body = message.body;
    let safeHTML = this.sanitizer.bypassSecurityTrustHtml(body);
    return safeHTML;
  }

  private getActiveMessageBody(): SafeHtml
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
