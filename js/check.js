import { Main } from "../main.js";
import { Element } from "./element.js";
import { Common } from "./common.js";

export class Check {
  constructor() {
    this.datas = Common.get_matrix_numbers("all");
    this.judgement();
  }

  judgement() {
    if (
      this.check_empty() ||
      this.check_error_horizon() ||
      this.check_error_vertical() ||
      this.check_error_cube()
    ) {
      this.fail();
    } else {
      this.correct();
    }
  }

  //空欄がある場合にtrueを返す
  check_empty() {
    for (const data of this.datas) {
      const empty_lists = data.filter((e) => !e);
      if (empty_lists.length) {
        this.status = "empty";
        return true;
      }
    }
  }
  //横一列に重複数値がある場合はtrueを返す
  check_error_horizon() {
    for (const data of this.datas) {
      if (this.check_over(data)) {
        this.status = "horizon";
        return true;
      }
    }
  }
  //縦一列に重複数値がある場合はtrueを返す
  check_error_vertical() {
    const pivot_datas = this.convert_pivot_datas(this.datas);
    for (const data of pivot_datas) {
      if (this.check_over(data)) {
        this.status = "vertical";
        return true;
      }
    }
  }
  //3x3の枠内に重複数値がある場合はtrueを返す
  check_error_cube() {
    const cube_datas = this.convert_cube_datas(this.datas);
    for (const data of cube_datas) {
      if (this.check_over(data)) {
        this.status = "cube";
        return true;
      }
    }
  }
  //配列内の重複確認
  check_over(arr) {
    const res = this.get_over(arr);
    return res.length ? true : false;
  }
  get_over(arr) {
    return arr.filter((a, b, c) => {
      return c.indexOf(a) === b && b !== c.lastIndexOf(a);
    });
  }

  //２重配列の縦横を入れ替える
  convert_pivot_datas(datas) {
    const pivot_datas = [];
    for (let i = 0; i < datas.length; i++) {
      for (let j = 0; j < datas[i].length; j++) {
        pivot_datas[j] = pivot_datas[j] || [];
        pivot_datas[j].push(datas[i][j]);
      }
    }
    return pivot_datas;
  }
  convert_pivot_datas_reverse(datas) {
    const pivot_datas = [];
    for (let i = 0; i < datas.length; i++) {
      for (let j = datas[i].length - 1; j >= 0; j--) {
        pivot_datas[j] = pivot_datas[j] || [];
        pivot_datas[j].push(datas[i][j]);
      }
    }
    return pivot_datas;
  }

  //3x3毎のブロックで配列を組み直す
  convert_cube_datas(datas) {
    const cube_datas = [];
    let x, y, num;
    for (let i = 0; i < datas.length; i++) {
      x = ~~(i / 3);
      for (let j = 0; j < datas[i].length; j++) {
        y = ~~(j / 3);
        num = x * 3 + y;
        cube_datas[num] = cube_datas[num] || [];
        cube_datas[num].push(datas[i][j]);
      }
    }
    return cube_datas;
  }

  get_error_matrix() {
    const error_datas = [];
    //vertical1
    const vertical_datas = this.convert_pivot_datas(this.datas);
    const vertical_datas_new = [];
    for (const pivot_data of vertical_datas) {
      const data = pivot_data.map((num, i, arr) => {
        return arr.indexOf(num) !== arr.lastIndexOf(num) ? 1 : 0;
      });
      vertical_datas_new.push(data);
    }
    const vertical_datas_reverse =
      this.convert_pivot_datas_reverse(vertical_datas_new);

    //cube1
    const cube_datas = this.convert_cube_datas(this.datas);
    const cube_datas_new = [];
    for (const cube_data of cube_datas) {
      const data = cube_data.map((num, i, arr) => {
        return arr.indexOf(num) !== arr.lastIndexOf(num) ? 1 : 0;
      });
      cube_datas_new.push(data);
    }
    const cube_datas_reverse = this.convert_cube_datas(cube_datas_new);
    for (let i = 0; i < this.datas.length; i++) {
      error_datas[i] = new Array(9).fill(0);
      //empty
      const empties = this.datas[i].map((num, i, arr) => {
        return !num ? 1 : 0;
      });
      error_datas[i] = this.error_overwrite(error_datas[i], empties);
      //horizon
      const horizon = this.datas[i].map((num, i, arr) => {
        return arr.indexOf(num) !== arr.lastIndexOf(num) ? 1 : 0;
      });
      error_datas[i] = this.error_overwrite(error_datas[i], horizon);
      //vertical2
      error_datas[i] = this.error_overwrite(
        error_datas[i],
        vertical_datas_reverse[i]
      );
      //cube2
      error_datas[i] = this.error_overwrite(
        error_datas[i],
        cube_datas_reverse[i]
      );
    }
    return error_datas;
  }
  error_overwrite(array_base, array_overwrite) {
    for (let i = 0; i < array_overwrite.length; i++) {
      if (array_base[i]) {
        continue;
      }
      if (!array_overwrite[i]) {
        continue;
      }
      array_base[i] = array_overwrite[i];
    }
    return array_base;
  }

  fail() {
    const error_datas = this.get_error_matrix();
    console.log(error_datas);
    Main.view.error(error_datas);
  }
  correct() {
    Main.data.save_clear();
    Main.view.correct();
    Main.history.add_list(Main.question_num);
  }
}
