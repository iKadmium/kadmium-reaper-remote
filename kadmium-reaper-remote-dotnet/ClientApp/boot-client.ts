import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import 'bootstrap';

// Enable either Hot Module Reloading or production mode
if (module['hot'])
{
    module['hot'].accept();
    module['hot'].dispose(() => { platform.destroy(); });
} else
{
    enableProdMode();
}

// Boot the application, either now or when the DOM content is loaded
const platform = platformBrowser();
const bootApplication = () => { platform.bootstrapModule(AppModule); };
if (document.readyState === 'complete')
{
    bootApplication();
} else
{
    document.addEventListener('DOMContentLoaded', bootApplication);
}
