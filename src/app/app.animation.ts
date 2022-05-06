import { trigger, animate,transition, style, group, query, animateChild } from "@angular/animations";

export const slideInAnimation =
  trigger('slideInAnimation', [
    transition('* <=> *', [

      query(':enter, :leave',
        style({
          position: 'fixed',
          width: '100%',
        }),
        {optional:true}
      ),

      group([
        // query(':enter', [
        //     style({transition: 'translateX(100%)'}),           
        //     animate('1s ease-out', style({ transform: 'translateX(0%)'}))
        // ],{optional:true}),

        query(':enter', [
          style({transition: 'translateX(100%)'}),           
          animate('3s ease-out', style({ transform: 'translateX(0%)'}))
      ], {optional:true}),

        query(':leave', [
            style({transition: 'translateX(0%)'}),           
            animate('2s ease-out', style({ transform: 'translateX(-100%)'}))
        ], {optional:true}),
      ]),
    ])
  ]);