import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild, viewChild } from '@angular/core';
import { IItem } from '../../interfaces/IItem.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef)

  @ViewChild("inputText") public inputText !: ElementRef;

  @Input({required: true}) public inputListItems: IItem[] = [];
  @Output() public outputAddListItem = new EventEmitter<IItem>();
  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const id = getId();

      this.outputAddListItem.emit({
        id,
        checked: false,
        value
      });
      
      return this.inputText.nativeElement.focus();
    }

    function getId() {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID_${timestamp}`;
      return id;
    }
  }
}
