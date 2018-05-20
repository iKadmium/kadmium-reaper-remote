export class Settings
{
    httpPort: number;
    reaperURI: string;
    lightingVenueURI: string;

    public load(data: SettingsData): void
    {
        this.httpPort = data.httpPort;
        this.reaperURI = data.reaperURI;
        this.lightingVenueURI = data.lightingVenueURI;
    }
}

export interface SettingsData
{
    httpPort: number;
    reaperURI: string;
    lightingVenueURI: string;
}