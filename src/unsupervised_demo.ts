import $ from "jquery";
import { nanoid } from "nanoid";
import { JsPsychPlugin, ParameterType, TrialType, JsPsych } from "jspsych";
import randomInteger from "random-int";
import { serverUrl } from "./main";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const info = {
  name: "unsupervised_demo",
  parameters: {
    images: {
      type: ParameterType.OBJECT,
      default: [],
    },
    duration: {
      type: ParameterType.INT,
      default: 60,
    },
  },
};

type Info = typeof info;

type Image = string;

class UnsupervisedDemoPlugin implements JsPsychPlugin<Info> {
  static info = info;
  private jsPsych: JsPsych;
  private static counter = 0;
  private images: Image[] = [];
  private rootEl: HTMLElement;
  private visible = false;
  private keepSubtracting = true;
  private startTime = performance.now();

  // Show a triangle after a random delay
  private delay: number;

  constructor(jsPsych: JsPsych) {
    this.jsPsych = jsPsych;
  }

  showTriangle() {}

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    this.rootEl = display_element;
    this.images = trial.images;

    shuffleArray(this.images);

    console.log(trial);

    $(this.rootEl).addClass('w-screen top-0 left-0 absolute p-12').html(`<div class="grid grid-cols-5 gap-4">
      ${this.images.map((image) => `<img class="w-[480px]" src="${image}" />`).join("")}
    </div>`);
  }

  showTimer(el: HTMLElement, duration: number) {
    let timeLeft = duration;
    $(el).html(`Time Left: ${timeLeft} seconds`);

    const x = setInterval(() => {
      if (this.keepSubtracting) --timeLeft;
      $(el).html(`Time Left: ${timeLeft} seconds`);

      if (timeLeft <= 0) {
        clearInterval(x);
        this.finishTrial();
      }
    }, 1000);
  }

  finishTrial() {
    let data = {
      kind: "unsupervised-demo",
      families: this.families,
      startTime: this.startTime,
      endTime: performance.now(),
    };
    this.rootEl.innerHTML = "";
    this.jsPsych.finishTrial(data);
  }
}

export default UnsupervisedDemoPlugin;
