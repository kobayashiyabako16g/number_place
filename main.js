import { View } from "./js/view.js";
import { Input } from "./js/input.js";
import { Question } from "./js/question.js";
import { Data } from "./js/data.js";
import { Common } from "./js/common.js";
import { History } from "./js/history.js";

export const Main = {
  stage_id: "NumberPlace",
  data_path: "data/questions.json",
  save_name: "mynt_number_place_save",
  clear_name: "mynt_number_place_clear",
  interval_px: 10,
  question_num: 0,
};
function init() {
  Main.data = new Data();
  Main.history = new History();
  Main.view = new View();
  Main.input = new Input();
  Main.question = new Question({
    callback: ((e) => {
      Common.continue();
    }).bind(this),
  });
}
switch (document.readyState) {
  case "complete":
  case "interactive":
    init();
    break;
  default:
    window.addEventListener("DOMContetLoaded", init);
    break;
}
