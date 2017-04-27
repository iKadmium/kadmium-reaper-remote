import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent
{
    private reaperUri: string;

    constructor()
    {
        this.reaperUri = "http://" + location.hostname + ":9080/live.html";
    }
}
