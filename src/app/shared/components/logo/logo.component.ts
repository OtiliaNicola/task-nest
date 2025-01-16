import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  template: `
    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="50%" 
            text-anchor="middle" 
            dominant-baseline="middle"
            fill="#8AB987"
            font-family="Arial, sans-serif"
            font-size="28"
            font-weight="bold">
        Task<tspan fill="#B7D4B4">Nest</tspan>
      </text>
    </svg>
  `
})
export class LogoComponent {}
