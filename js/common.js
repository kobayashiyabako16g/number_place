import { Main } from "../main.js";
import { Element } from "./element.js";
import { Note } from "./note.js";

export class Common {
  static get is_started() {
    if (Element.elm_button.getAttribute("data-status") === "check") {
      return true;
    } else {
      return false;
    }
  }

  static start() {
    Element.elm_button.setAttribute("data-status", "check");
    Main.question.new(Main.question_num);
  }

  static continue() {
    const datas = Main.data.load_cache();
    if (!datas) {
      return;
    }
    Main.question_num = datas.question_num;
    this.start();
    this.put_number(datas.input);
    Note.put_number(datas.note);
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
        td_lists[j].textContent = num;
      }
    }
  }

  //type:lock or''
  static get_matrix_numbers(type = "") {
    const tr_lists = Element.tr_lists;
    if (!tr_lists || !tr_lists.length) {
      return;
    }
    const numbers = [];
    for (let i = 0; i < tr_lists.length; i++) {
      numbers[i] = [];
      const td_lists = tr_lists[i].getElementsByTagName("td");
      for (let j = 0; j < td_lists.length; j++) {
        numbers[i][j] = this.get_cell_status(td_lists[j], type);
      }
    }
    return numbers;
  }

  static get_cell_status(cell, type) {
    if (type === "all" || cell.getAttribute("data-status") === type) {
      return Number(cell.textContent || 0);
    } else {
      return 0;
    }
  }
}
