import $ from "jquery";
import { nanoid } from "nanoid";
import { JsPsychPlugin, ParameterType, TrialType, JsPsych } from "jspsych";

const info = {
  name: "demo",
  parameters: {
    families: {
      type: ParameterType.OBJECT,
      default: [],
    },
    duration: {
      type: ParameterType.INT,
      default: 30,
    },
  },
};

type Info = typeof info;

type Family = {
  name: string;
  images: string[];
};

class DemoPlugin implements JsPsychPlugin<Info> {
  static info = info;
  private jsPsych: JsPsych;
  private id: string;
  private static counter = 0;
  private families: Family[] = [];
  private rootEl: HTMLElement;

  constructor(jsPsych: JsPsych) {
    this.jsPsych = jsPsych;
    this.id = nanoid();
  }

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    const families = trial.families as Family[];
    this.families = families;
    this.rootEl = display_element;
    const duration = trial.duration;
    $(display_element).html(`<div class="text-center flex flex-col gap-2">
      <h3 class="text-2xl">Spend ${duration} seconds to learn the families and their respective objects.</h3>
      <div id="demo-${this.id}-timer" class="text-xl font-semibold"></div>
    </div>`);

    this.showTimer(document.getElementById(`demo-${this.id}-timer`), duration);

    families.forEach((f) => {
      const id = `demo-${this.id}-${DemoPlugin.counter++}`;
      $(display_element).append($("<div />").attr("id", id));
      this.renderFamily(document.getElementById(id), f);
    });
  }

  showTimer(el: HTMLElement, duration: number) {
    let timeLeft = duration;
    $(el).html(`Time Left: ${timeLeft} seconds`);

    const x = setInterval(() => {
      --timeLeft;
      $(el).html(`Time Left: ${timeLeft} seconds`);

      if (timeLeft <= 0) {
        clearInterval(x);
        this.finishTrial();
      }
    }, 1000);
  }

  finishTrial() {
    let data = {
      families: this.families,
    };
    this.rootEl.innerHTML = "";
    this.jsPsych.finishTrial(data);
  }

  private renderFamily(el: HTMLElement, f: Family) {
    $(el).addClass("flex pt-12 justify-center py-6 px-4 flex-col gap-6");
    $(el).html(
      `<h2 class="text-3xl font-medium tracking-wide text-center"><span class="font-bold">${f.name}</span> Family</h2>`
    );

    const images = f.images;

    const imagesNodes = images
      .map((img) => `<img src="${img}" class="w-80" />`)
      .join("");

    $(el).append(`<div class="grid grid-cols-3">${imagesNodes}</div>`);
  }
}

export default DemoPlugin;
