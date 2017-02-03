export class Settings
{
    httpPort: number;
    reaperURI: string;

    public load(data: SettingsData): void
    {
        this.httpPort = data.httpPort;
        this.reaperURI = data.reaperURI;
    }
}

export interface SettingsData
{
    httpPort: number;
    reaperURI: string;
}