import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from "@angular/animations";

const duration = 400;

export const SlideInOut =
    trigger('slideInOut', [
        state('in', style({ transform: 'translateX(0)' })),
        transition('void => *', [
            style({ transform: 'translateX(-100%)' }),
            animate(duration)
        ]),
        transition('* => void', [
            animate(duration + "ms ease-in-out", style({ transform: 'translateX(-100%)' }))
        ])
    ]);