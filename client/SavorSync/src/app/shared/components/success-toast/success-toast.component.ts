import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-toast.component.html',
  styleUrls: ['./success-toast.component.css']
})
export class SuccessToastComponent {
  @Input() message: string = '';
}