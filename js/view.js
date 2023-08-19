import { Main } from "../main.js";
import { Element } from "./element.js";

export class View {
  constructor() {
    if (!Element.table) {
      return;
    }
    this.set_stage();
  }

  set_stage() {
    const table = document.createElement("table");
    Element.table.appendChild(table);
    this.set_row(table);
  }

  set_row(parent) {
    for (let i = 0; i < 9; i++) {
      const row = document.createElement("tr");
      parent.appendChild(row);
      this.set_cell(row);
    }
  }
  set_cell(parent) {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("td");
      parent.appendChild(cell);
    }
  }

  error(error_datas) {
    this.set_data_error(error_datas);
    alert("違うよ");
  }

  correct() {
    this.set_data_error();
    Main.input.set_same_number();
    Element.elm_button.setAttribute("data-status", "next");
    alert("正解");
  }

  set_data_error(error_datas) {
    const tr_lists = Element.tr_lists;
    for (let i = 0; i < tr_lists.length; i++) {
      const td_lists = tr_lists[i].getElementsByTagName("td");
      for (let j = 0; j < td_lists.length; j++) {
        if (error_datas && error_datas[i] && error_datas[i][j]) {
          td_lists[j].setAttribute("data-error", 1);
        } else if (td_lists[j].hasAttribute("data-error")) {
          td_lists[j].removeAttribute("data-error");
        }
      }
    }
  }
}
