import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { NotificationsService } from "./notifications.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy
{
    constructor(public titleService: Title)
    {
    }

    ngOnInit(): void
    {
    }

    ngOnDestroy(): void
    {
        document.body.appendChild(document.createElement("app"));
    }
}
