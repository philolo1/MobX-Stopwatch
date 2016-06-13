import {observable, computed, action} from 'mobx';
import {v4} from 'node-uuid';
import moment from 'moment';
import format from 'format-number-with-string';

export class Timer {
  @observable milliseconds;
  @observable savedMilliseconds;

  constructor(initialMilliseconds = 0) {
    this.milliseconds = initialMilliseconds;
    this.savedMilliseconds = 0;
    this.id = v4();
  }

  @action saveTime() {
    this.savedMilliseconds += this.milliseconds;
    this.milliseconds = 0;
  }

  @action reset() {
    this.milliseconds = this.savedMilliseconds = 0;
  }

  @computed get totalMilliSeconds() {
    return this.milliseconds + this.savedMilliseconds;
  }

  @computed get display() {
    const tenMilliSeconds = parseInt(this.totalMilliSeconds / 10, 10);

    const seconds = parseInt(tenMilliSeconds / 100, 10);
    const minutes = parseInt(seconds / 60, 10);

    return `${minutes} : ${format(seconds % 60, '00')} :  ${format(tenMilliSeconds % 100, '00')}`;
  }
}

export class TimerStore {

  @observable isRunning;
  @observable timer;
  @observable startTime;

  @observable laps;

  constructor() {
    this.isRunning = false;
    this.timer = new Timer();
    this.laps = [];
  }

  @computed get mainDisplay() {
    return this.timer.display;
  }

  @computed get hasStarted() {
    return this.timer.totalMilliSeconds !== 0;
  }

  @action measure() {
    if (!this.isRunning) return;

    this.timer.milliseconds = moment().diff(this.startTime);

    setTimeout(() => this.measure(), 10);
  }

  @action startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = moment();
    this.measure();
  }

  @computed get length() {
    return this.laps.length;
  }

  @computed get lapTime() {
    return this.laps.map((el) => el.totalMilliSeconds)
      .reduce((x, y) => x + y, 0);
  }

  @action lapTimer() {
    this.laps.push(new Timer(this.timer.totalMilliSeconds - this.lapTime));
  }

  @computed get lapData() {
    const data = [];
    for (let i = 0; i < this.laps.length; i++) {
      data.push({
        lap: this.laps[i],
        text: `Lap ${i + 1}`,
      });
    }
    return data.reverse();
  }

  @action stopTimer() {
    this.timer.saveTime();
    this.isRunning = false;
  }

  @action resetTimer() {
    this.timer.reset();
    this.laps = [];
    this.isRunning = false;
  }

}
