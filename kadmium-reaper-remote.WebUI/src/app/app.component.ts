import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { NotificationsService } from "./notifications.service";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

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
        library.add(fas, far);
    }

    ngOnDestroy(): void
    {
        document.body.appendChild(document.createElement("app"));
    }
}
