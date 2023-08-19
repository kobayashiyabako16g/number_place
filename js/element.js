import { Main } from "../main.js";

export class Element {
  static get table() {
    return document.getElementById(Main.stage_id);
  }
  static get tr_lists() {
    return this.table.getElementsByTagName("tr");
  }
  static get elm_button() {
    return document.querySelector("button#btn");
  }
  static get elm_new_button() {
    return document.querySelector("button#NumberPlace_NewGame");
  }
}
