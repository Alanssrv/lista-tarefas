import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from "../../components/input-add-item/input-add-item.component";
import { IItem } from '../../interfaces/IItem.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ELocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2'

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
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]');
  }
  
  public getInputAndAddItem(value: IItem) {
    localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public deleteAllItems() {
    Swal.fire({
      title: "Tem certeza?",
      text: "Está ação é irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, remover todos os itens!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
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

    return this.#updateLocalStorage();
  }

  public updateItemValue(newItem: {id: string, value: string}) {
    this.#setListItems.update((oldValue: IItem[]) => {
      oldValue.filter(res => {
        if (res.id === newItem.id)
          res.value = newItem.value
        return res;
      });

      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  public deleteItem(id: string) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Está ação é irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, remover item!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IItem[]) => {
          return oldValue.filter(res => res.id !== id);
        });
        return this.#updateLocalStorage();
      }
    });
  }

  #updateLocalStorage () {
    localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.#setListItems()));
  }
}
