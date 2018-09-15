import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Status } from "../status";
import { StatusCode } from "../status-code.enum";
import { ToastsComponent } from '../toasts/toasts.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    public messages: Status[];
    public toastsComponent: ToastsComponent;

    constructor()
    {
        this.messages = [];
    }

    public add(statusCode: StatusCode, message: any): void
    {
        let status: Status;
        if (message instanceof Error)
        {
            status = new Status(statusCode, message.message);
        }
        else if (message instanceof HttpErrorResponse)
        {
            status = new Status(statusCode, message.message);
        }
        else
        {
            status = new Status(statusCode, message);
        }

        this.messages.push(status);
        switch (statusCode)
        {
            case StatusCode.Error:
                console.error(message);
                break;
            default:
                console.log(message);
                break;
        }
        if (this.toastsComponent != null)
        {
            this.toastsComponent.addToast(status);
        }
    }
}
