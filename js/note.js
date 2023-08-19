import { Element } from "./element.js";

export class Note {
  constructor() {
    this.status = false;
  }

  get_status() {
    return this.status;
  }

  change_status() {
    this.status = !this.status;
  }

  static put_number(datas) {
    const tr_lists = Element.tr_lists;
    if (!tr_lists || !tr_lists.length) {
      return;
    }
    for (let i = 0; i < tr_lists.length; i++) {
      const td_lists = tr_lists[i].getElementsByTagName("td");
      for (let j = 0; j < td_lists.length; j++) {
        const num = datas[i][j];
        if (!num) {
          continue;
        }
        td_lists[j].setAttribute("data-status", "note");
        td_lists[j].textContent = num;
      }
    }
  }
}
