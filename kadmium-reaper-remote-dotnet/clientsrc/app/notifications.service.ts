import { Injectable } from '@angular/core';
import { MessageBarComponent } from "./message-bar/message-bar.component";
import { StatusCode } from "./status-code.enum";
import { Response } from '@angular/http';
import { Status } from "./status";

@Injectable()
export class NotificationsService
{
    public component: MessageBarComponent;
    public messages: Status[];

    constructor()
    {
        this.component = null;
        this.messages = [];
    }

    public toggleNotificationBarVisibility(): void
    {
        this.component.toggleCollapse();
    }

    public add(statusCode: StatusCode, message: any): void
    {
        if (statusCode == StatusCode.Error)
        {
            if (message instanceof Response)
            {
                this.addHttpError(message as Response);
            }
            else
            {
                this.messages.push(new Status(statusCode, message));
                console.error(message);
            }
        }
        else
        {
            this.messages.push(new Status(statusCode, message));
        }
        if (this.component != null)
        {
            this.toast(statusCode, message);
        }
    }

    private addHttpError(reason: Response): void
    {
        let error = new Status(StatusCode.Error, reason.statusText + ": " + reason.url, reason.text());
        this.messages.push(error);
    }

    private toast(statusCode: StatusCode, message: string): void
    {
        let options = { positionClass: "toast-bottom-right" };
        switch (statusCode)
        {
            case StatusCode.Success:
                this.component.toastr.success(message, null, options);
                break;
            case StatusCode.Error:
                this.component.toastr.error(message, null, options);
                break;
            case StatusCode.Unknown:
                this.component.toastr.info(message, null, options);
                break;
            case StatusCode.Warning:
                this.component.toastr.warning(message, null, options);
                break;
        }
    }
}
