export class Settings
{
    httpPort: number;
    reaperURI: string;
    lightingVenueURI: string;
    testingFileCommand: string;
    testingFileFrequency: TestingFileFrequency;

    public load(data: SettingsData): void
    {
        Object.assign(this, data);
    }
}

export interface SettingsData
{
    httpPort: number;
    reaperURI: string;
    lightingVenueURI: string;
    testingFileCommand: string;
    testingFileFrequency: TestingFileFrequency;
}

export enum TestingFileFrequency
{
    Always,
    OnShowDay,
    Never
}