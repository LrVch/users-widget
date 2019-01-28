import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../models';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  @Input('users') users: User[];
  @Output() refreshAll = new EventEmitter<void>();
  @Output() refreshOne = new EventEmitter<number>();

  onRefreshAll(): void {
    this.refreshAll.emit();
  }

  onChange(id: number): void {
    this.refreshOne.emit(id);
  }

  trackById(user: User, index) {
    return user.id;
  }

  get length() {
    return 0;
  }
}
