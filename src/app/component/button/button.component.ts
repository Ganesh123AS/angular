import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() onClick: () => void;
  @Input() color: string;
  @Input() width: string;
  @Input() padding: string;

  constructor() { }

  handleClick(): void {
    if (this.onClick) { // Ensure onClick is defined
      this.onClick(); // Call the onClick function when the button is clicked
    }
  }

  ngOnInit(): void {
  }

}
