import { Component, OnInit } from '@angular/core';
import { StatusCode } from 'app/status-code.enum';
import { Status } from '../status';
import { NotificationsService } from 'app/notifications.service';
import { trigger, transition, query, animateChild } from '@angular/animations';

@Component({
	selector: 'app-toasts',
	templateUrl: './toasts.component.html',
	styleUrls: ['./toasts.component.css'],
	animations: [
		trigger('flyInOutParent', [
			transition(':enter, :leave', [
				query('@*', animateChild())
			])
		])
	]
})
export class ToastsComponent implements OnInit
{
	public toasts: Status[] = [];
	constructor(notificationsService: NotificationsService) 
	{
		notificationsService.toastsComponent = this;
	}

	ngOnInit()
	{

	}

	public addToast(toast: Status, timeout: number = 3000): void
	{
		this.toasts.push(toast);
		window.setTimeout(() =>
		{
			let index = this.toasts.indexOf(toast);
			this.toasts.splice(index, 1);
		}, timeout)
	}

}