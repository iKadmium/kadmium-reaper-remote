export class Status
{
    static StatusTable: StatusTable = {
        Success: { alertStyle: "alert-success", glyphIcon: "glyphicon-ok-sign" },
        Error: { alertStyle: "alert-danger", glyphIcon: "glyphicon-remove-sign" },
        Warning: { alertStyle: "alert-warning", glyphIcon: "glyphicon-info-sign" },
        Unknown: { alertStyle: "alert-info", glyphIcon: "glyphicon-question-sign" }
    };

    public code: StatusCode;
    public message: string;
    public body: string;

    constructor(code: StatusCode, message: string)
    {
        this.code = code;
        this.message = message;
    }

    public update(code: StatusCode, message: string)
    {
        this.code = code;
        this.message = message;
    }

    public get alertStyle(): string
    {
        return Status.StatusTable[this.code].alertStyle;
    }

    public get glyphIcon(): string
    {
        return Status.StatusTable[this.code].glyphIcon;
    }
}

export type StatusCode = "Unknown" | "Error" | "Success" | "Warning";

export interface StatusTable
{
    [key: string]: StatusInfo;
}
export interface StatusInfo
{
    alertStyle: string;
    glyphIcon: string;
}