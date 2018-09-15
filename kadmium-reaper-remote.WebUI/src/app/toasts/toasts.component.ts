import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { Status } from '../status';

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