import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from "../../components/input-add-item/input-add-item.component";
import { IItem } from '../../interfaces/IItem.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  #setListItems = signal<IItem[]>(this.#parseItems());

  public addItem = signal(true);
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }
  
  public getInputAndAddItem(value: IItem) {
    localStorage.setItem(
      '@my-list',
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public deleteAllItems() {
    localStorage.removeItem('@my-list');

    return this.#setListItems.set(this.#parseItems());
  }

  listItemsStage(value: 'pending' | 'completed'): IItem[] {
    return this.getListItems().filter((res: IItem) => {
      if (value === 'pending')
        return !res.checked;

      if (value === 'completed')
        return res.checked;

      return res;
    });
  }    

  public updateItemCheckbox(newItem: {id: string, checked: boolean}) {
    this.#setListItems.update((oldValue: IItem[]) => {
      oldValue.filter(res => {
        if (res.id === newItem.id)
          res.checked = newItem.checked
        return res;
      });

      return oldValue;
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()));
  }
}
