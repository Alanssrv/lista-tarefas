import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../interfaces/IItem.interface';

@Component({
  selector: 'app-input-list-item',
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({required: true}) public inputListItems: IItem[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();

  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({id, checked});
  }
}
