import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models';

@Component({
  selector: 'app-widget-item',
  templateUrl: './widget-item.component.html',
  styleUrls: ['./widget-item.component.scss']
})
export class WidgetItemComponent  {
  @Input('user') user: User = {} as User;
  @Output() change = new EventEmitter();

  onChange() {
    this.change.emit(this.user.id);
  }
}
