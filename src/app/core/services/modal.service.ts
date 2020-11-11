import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: any[] = [];

  constructor() {}

  add(modal: any): void {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string): void {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string): void {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  close(id: string): void {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
