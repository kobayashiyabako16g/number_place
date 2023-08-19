import { Main } from "../main.js";
import { Element } from "./element.js";

export class Question {
  constructor(options) {
    this.options = options || {};
    this.load();
  }

  load() {
    const xhr = new XMLHttpRequest();
    xhr.open("get", Main.data_path, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = ((e) => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      const status = xhr.status;
      if (
        status === 0 ||
        (status >= 200 && status < 400) ||
        e.target.response
      ) {
        this.datas = JSON.parse(e.target.response);
      }
      this.finish();
    }).bind(this);
    xhr.send();
  }

  new(num) {
    Main.question_num = num || Main.question_num;
    const data = this.datas[Main.question_num];
    if (!data || !data.data) {
      return;
    }
    this.put_numbers(data.data);
  }

  put_numbers(datas) {
    const tr_lists = Element.tr_lists;
    if (!tr_lists || !tr_lists.length) {
      return;
    }
    for (let i = 0; i < datas.length; i++) {
      const td_lists = tr_lists[i].getElementsByTagName("td");
      for (let j = 0; j < datas[i].length; j++) {
        if (datas[i][j]) {
          td_lists[j].textContent = datas[i][j];
          td_lists[j].setAttribute("data-status", "lock");
        } else {
          td_lists[j].textContent = "";
          td_lists[j].setAttribute("data-status", "");
        }
      }
    }
  }

  finish() {
    if (this.options.callback) {
      this.options.callback();
    }
  }

  get_question_data(num) {
    if (!this.datas || !this.datas.length) {
      return null;
    }
    return this.datas[num];
  }
}
