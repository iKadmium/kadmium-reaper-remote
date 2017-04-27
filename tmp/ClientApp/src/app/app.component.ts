import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MessageBarComponent } from "../status/message-bar/message-bar.component";
import { Title } from "@angular/platform-browser";
import { MessageBarService } from "../status/message-bar/message-bar.service";

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')]
})
export class AppComponent implements OnInit, OnDestroy
{
    @ViewChild("messageBar") messageBar: MessageBarComponent;

    constructor(private titleService: Title, private messageBarService: MessageBarService)
    {

    }

    ngOnInit(): void
    {
        this.messageBarService.component = this.messageBar;
    }

    ngOnDestroy(): void
    {
        document.body.appendChild(document.createElement("app"));
    }
}
