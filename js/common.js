import { Main } from "../main.js";
import { Element } from "./element.js";

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
    Main.time.setting(Main.question_num, 1000);
    Main.time.start();
  }

  static continue() {
    const datas = Main.data.load_cache();
    if (!datas) {
      return;
    }
    Main.question_num = datas.question_num;
    this.start();
    this.put_number(datas.input);
    this.put_number(datas.note, "note");
    Main.time.continue(datas.elapsed_time);
  }

  static put_number(datas, status = null) {
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
        if (status != null) {
          td_lists[j].setAttribute("data-status", status);
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
    if (type === "all" && cell.getAttribute("data-status") !== "note") {
      return Number(cell.textContent || 0);
    } else if (cell.getAttribute("data-status") === type) {
      return Number(cell.textContent || 0);
    } else {
      return 0;
    }
  }

  static msToTime(duration) {
    const hour = Math.floor(duration / 3600000);
    const minute = Math.floor((duration - 3600000 * hour) / 60000);

    const hh = ("00" + hour).slice(-2);
    const mm = ("00" + minute).slice(-2);
    const ms = ("00000" + (duration % 60000)).slice(-5);

    const time = `${hh}:${mm}:${ms.slice(0, 2)}`;

    return time;
  }
}
