import { StatusCode } from "./status-code.enum";

export class Status 
{
    constructor(public statusCode?: StatusCode, public body?: string, public details?: any)
    {
        if (statusCode == null)
        {
            this.statusCode = StatusCode.Unknown;
            this.body = "Unknown";
        }
    }

    public get alertStyle(): string
    {
        return Status.getAlertStyle(this.statusCode);
    }

    public get glyphIcon(): string
    {
        return Status.getGlyphIcon(this.statusCode);
    }

    public get bgStyle(): string
    {
        return Status.getBGStyle(this.statusCode);
    }

    public get textStyle(): string
    {
        return Status.getTextStyle(this.statusCode);
    }

    public static getBGStyle(code: StatusCode): string
    {
        switch (code)
        {
            case StatusCode.Error:
                return "bg-danger";
            case StatusCode.Info:
                return "bg-info";
            case StatusCode.Success:
                return "bg-success";
            default:
            case StatusCode.Unknown:
                return "bg-info";
            case StatusCode.Warning:
                return "bg-warning";
        }
    }

    public static getTextStyle(code: StatusCode): string
    {
        switch (code)
        {
            case StatusCode.Error:
                return "text-white";
            case StatusCode.Info:
                return "text-white";
            case StatusCode.Success:
                return "text-white";
            default:
            case StatusCode.Unknown:
                return "text-white";
            case StatusCode.Warning:
                return "text-white";
        }
    }

    public static getAlertStyle(code: StatusCode): string
    {
        switch (code)
        {
            case StatusCode.Error:
                return "alert-danger";
            case StatusCode.Info:
                return "alert-info";
            case StatusCode.Success:
                return "alert-success";
            default:
            case StatusCode.Unknown:
                return "alert-info";
            case StatusCode.Warning:
                return "alert-warning";
        }
    }

    public static getGlyphIcon(code: StatusCode): string
    {
        switch (code)
        {
            case StatusCode.Error:
                return "glyphicon glyphicon-remove-sign";
            case StatusCode.Info:
                return "glyphicon glyphicon-info-sign";
            case StatusCode.Success:
                return "glyphicon glyphicon-ok-sign";
            default:
            case StatusCode.Unknown:
                return "glyphicon glyphicon-question-sign";
            case StatusCode.Warning:
                return "glyphicon glyphicon-info-sign";
        }
    }
}