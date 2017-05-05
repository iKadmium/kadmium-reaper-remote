import { Component, OnInit } from '@angular/core';
import { ReaperService } from "../reaper.service";
import { DomSanitizer, SafeUrl, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-reaper',
  templateUrl: './reaper.component.html',
  styleUrls: ['./reaper.component.css'],
  providers: [ReaperService]
})
export class ReaperComponent implements OnInit
{
  public reaperUri: string;

  constructor(private reaperService: ReaperService, private sanitizer: DomSanitizer, private title: Title)
  {

  }

  public getUri(): SafeUrl
  {
    let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.reaperUri);
    return safeUrl;
  }

  ngOnInit()
  {
    this.title.setTitle("Reaper Remote");
    this.reaperUri = "http://" + location.hostname + ":9080/live.html";
  }

}
