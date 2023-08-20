import { Element } from "./element.js";
import { Common } from "./common.js";
import { Main } from "../main.js";

export class Time {
  constructor() {
    this.currentTime = 0; // ミリ秒
    this.totalTime = 0; // ミリ秒
    this.updateInterval = 1000;
    this.loadingInterval = null;
    this.imgAnim = 0;
    this.imgUpdateInterval = 100;
    this.animInterval = null;
    this.isStopped = false;
  }
  getCurrentTime() {
    return this.currentTime;
  }
  getTotalTime() {
    return this.totalTime;
  }

  setting(num, updateInterval) {
    const data = Main.question.get_question_data(num);
    if (!data || !data.time) return;
    this.totalTime = data.time;
    this.updateInterval = updateInterval;
  }

  dispose() {
    clearInterval(this.animInterval);
    clearInterval(this.loadingInterval);
    this.currentTime = 0;
    this.elapsedTime = 0;
    this.imgUpdateInterval = 100;
    Element.elm_loading_character.style.backgroundImage = `url("../img/cat_sleep.svg")`;
    Element.elm_loading_character.style.left = "0%";
  }

  reset() {
    console.debug("reset");
    this.isStopped = false;
    this.dispose();
    this.loadingInterval = setInterval(
      this.simulateProgress.bind(this),
      this.updateInterval
    );
    this.animInterval = setInterval(
      this.animation.bind(this),
      this.imgUpdateInterval
    );
    this.simulateProgress();
    this.animation();
  }

  start() {
    console.debug("start");
    this.isStopped = false;
    this.dispose();
    // continue
    const data = Main.data.load_cache();
    if (data && data.question_num === Main.question_num) return;

    this.loadingInterval = setInterval(
      this.simulateProgress.bind(this),
      this.updateInterval
    );
    this.animInterval = setInterval(
      this.animation.bind(this),
      this.imgUpdateInterval
    );
    this.simulateProgress();
    this.animation();
  }

  continue(elapsedTime) {
    console.debug("continue");
    if (!Common.is_started) return;
    this.isStopped = false;
    this.dispose();
    this.currentTime = elapsedTime;
    this.updateTime(this.currentTime);
    const progress = this.getProgress();
    if (progress > 0) {
      this.updateLoadingBar(progress);
      this.updateAnim(progress);
    }
    this.loadingInterval = setInterval(
      this.simulateProgress.bind(this),
      this.updateInterval
    );
    this.animInterval = setInterval(
      this.animation.bind(this),
      this.imgUpdateInterval
    );
    this.simulateProgress();
    this.animation();
  }

  stop() {
    console.debug("stop");
    this.isStopped = true;
    clearInterval(this.animInterval);
    clearInterval(this.loadingInterval);
    Element.elm_loading_character.style.backgroundImage = `url("../img/cat_sleep.svg")`;
  }

  updateLoadingBar(progress) {
    Element.elm_loading_bar.style.width = progress + "%";
  }

  getProgress() {
    const progress = (this.currentTime / this.totalTime) * 100;
    if (progress < 0) {
      return 0;
    } else if (progress > 100) {
      return 100;
    } else {
      return progress;
    }
  }

  updateAnim(progress) {
    Element.elm_loading_character.style.left = progress - 10 + "%";
    this.imgAnim >= 4 ? (this.imgAnim = 0) : this.imgAnim++;
    Element.elm_loading_character.style.backgroundImage = `url("../img/cat_${this.imgAnim}.svg")`;
  }

  simulateProgress() {
    this.currentTime += this.updateInterval;
    this.updateTime(this.currentTime);
    const progress = this.getProgress();
    if (this.isTimeout()) {
      this.stop();
    } else {
      this.updateLoadingBar(progress);
      Main.data.save_cache();
    }
  }

  animation() {
    if (
      !this.isTimeout() &&
      this.currentTime > this.totalTime * 0.7 &&
      this.imgUpdateInterval != 30
    ) {
      this.imgUpdateInterval = 30;
      this.changeAnimInterval();
    }
    const progress = this.getProgress();
    this.updateAnim(progress);
    if (this.isTimeout() || this.isStopped) {
      Element.elm_loading_character.style.backgroundImage = `url("../img/cat_sleep.svg")`;
    }
  }

  changeAnimInterval() {
    clearInterval(this.animInterval);
    this.animInterval = setInterval(
      this.animation.bind(this),
      this.imgUpdateInterval
    );
  }

  updateTime(duration) {
    const time = Element.elm_time;
    const vTime = this.totalTime - duration;
    time.textContent = vTime > 0 ? Common.msToTime(vTime) : "00:00:00";
  }

  isTimeout() {
    return this.currentTime > this.totalTime;
  }
}
