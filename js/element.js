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
  static get elm_note_button() {
    return document.querySelector("button#Note");
  }
  static get elm_loading_bar() {
    return document.getElementById("loading-bar");
  }
  static get elm_loading_character() {
    return document.getElementById("cat");
  }
  static get elm_time() {
    return document.getElementById("time");
  }
}
