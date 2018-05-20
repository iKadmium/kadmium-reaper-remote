import { Component, OnInit, Input } from '@angular/core';
import { Status } from '../status';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.css'],
	animations: [
		trigger('flyInOut', [
			state('in', style({ transform: 'translateY(0)' })),
			transition(':enter', [
				style(
					{
						transform: 'translateY(100%)',
						opacity: 0
					}),
				animate('500ms ease-out')
			]),
			transition(':leave', [
				style(
					{
						transform: 'translateY(0)',
						opacity: 1
					}
				),
				animate('500ms ease-out', style(
					{
						transform: 'translateY(-100%)',
						opacity: 0
					}))
			])
		])
	]
})
export class ToastComponent implements OnInit
{
	@Input() status: Status;
	constructor() { }

	ngOnInit()
	{

	}

}
