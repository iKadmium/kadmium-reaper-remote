import { Component, Input } from '@angular/core';

import { Status } from "../status";

@Component({
    selector: 'status-panel',
    template: require('./status-panel.component.html'),
    styles: [require('./status-panel.component.css')]
})
export class StatusPanelComponent
{
    public status: Status;
    @Input("name") name: string;

    constructor()
    {
        this.status = new Status("Unknown", "Unknown");
    }
}