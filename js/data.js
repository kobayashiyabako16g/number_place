import { Main } from "../main.js";
import { Common } from "./common.js";

export class Data {
  save_cache() {
    if (!Common.is_started) {
      return;
    }
    const data = {
      question_num: Main.question_num,
      input: Common.get_matrix_numbers(""),
      note: Common.get_matrix_numbers("note"),
      question: Common.get_matrix_numbers("lock"),
    };
    const json = JSON.stringify(data);
    window.localStorage.setItem(Main.save_name, json);
  }

  load_cache() {
    const json = window.localStorage.getItem(Main.save_name);
    if (!json) {
      return null;
    }
    return JSON.parse(json);
  }

  del_cache() {
    window.localStorage.removeItem(Main.save_name);
  }

  save_clear() {
    if (!Common.is_started) {
      return;
    }
    const datas = this.load_clear();
    datas.push(this.make_save_data());
    const json = JSON.stringify(datas);
    window.localStorage.setItem(Main.clear_name, json);
  }
  make_save_data() {
    const clear_num_data = this.get_clear_data(Main.question_num);
    return {
      question_num: Main.question_num,
      input: Common.get_matrix_numbers(""),
      note: Common.get_matrix_numbers("note"),
      question: Common.get_matrix_numbers("lock"),
      count:
        clear_num_data && clear_num_data.count ? clear_num_data.count++ : 1,
      date: this.get_current_datetime(),
    };
  }

  load_clear() {
    const json = window.localStorage.getItem(Main.clear_name);
    return json ? JSON.parse(json) : [];
  }

  get_clear_data(num) {
    const datas = this.load_clear();
    if (!datas || !datas.length) {
      return;
    }
    return datas.find((e) => e.question_num === num);
  }

  del_clear() {
    window.localStorage.removeItem(Main.clear_name);
  }

  get_current_datetime() {
    const dt = new Date();
    const y = dt.getFullYear();
    const m = ("00" + String(dt.getMonth() + 1)).slice(-2);
    const d = ("00" + String(dt.getDate())).slice(-2);
    const h = ("00" + String(dt.getHours())).slice(-2);
    const i = ("00" + String(dt.getMinutes())).slice(-2);
    const s = ("00" + String(dt.getSeconds())).slice(-2);
    return `${y}-${m}-${d} ${h}:${i}:${s}`;
  }
}
