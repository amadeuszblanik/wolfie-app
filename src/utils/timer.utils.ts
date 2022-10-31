class TimerUtils {
  timer: NodeJS.Timeout | string | number | undefined = undefined;
  start: number;
  timeLeft: number;

  constructor(private callback: () => void, private delay: number) {
    this.timeLeft = this.delay;
    this.start = Date.now();
    this.resume();
  }

  public pause() {
    clearTimeout(this.timer);

    this.timer = undefined;
    this.timeLeft -= Date.now() - this.start;
  }

  public resume() {
    if (this.timer) {
      return;
    }

    this.start = Date.now();
    this.timer = setTimeout(this.callback, this.timeLeft, this.timer);
  }
}

export default TimerUtils;
