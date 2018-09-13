import { Injectable } from '@angular/core';
import { StatusCode } from "./status-code.enum";
import { Response } from '@angular/http';
import { Status } from "./status";
import { NotificationMenuComponent } from "./notification-menu/notification-menu.component";
import { ToastsComponent } from './toasts/toasts.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    public component: NotificationMenuComponent;
    public messages: Status[];
    public toastsComponent: ToastsComponent;

    constructor()
    {
        this.component = null;
        this.messages = [];
    }

    public add(statusCode: StatusCode, message: any): void
    {
        let status = new Status(statusCode, message);
        if (statusCode == StatusCode.Error)
        {
            if (message instanceof Response)
            {
                this.addHttpError(message as Response);
            }
            else if (message instanceof Error)
            {
                this.messages.push(status);
                console.error(message);
            }
            else
            {
                this.messages.push(status);
                console.error(message);
            }
        }
        else
        {
            this.messages.push(status);
        }
        if (this.component != null)
        {
            this.toastsComponent.addToast(status);
        }
    }

    private addHttpError(reason: Response): void
    {
        let error = new Status(StatusCode.Error, reason.statusText + ": " + reason.url, reason.text());
        this.messages.push(error);
    }
}
