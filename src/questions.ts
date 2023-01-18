import $ from "jquery";
import { nanoid } from "nanoid";
import { JsPsychPlugin, ParameterType, TrialType, JsPsych } from "jspsych";

const info = {
  name: "questions",
  parameters: {
    phase: {
      type: ParameterType.INT,
    },
    questions: {
      type: ParameterType.OBJECT,
    },
  },
};

type Info = typeof info;

type Question = {
  image: string;
  choices: string[];
  answerIndex: number;
};

class QuestionsPlugin implements JsPsychPlugin<Info> {
  static info = info;
  private phase: number;
  private rootEl: HTMLElement;
  private questions: Question[] = [];
  private id: string = nanoid();
  constructor(private jsPsych: JsPsych) {
  }

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    this.phase = trial.phase;
    this.rootEl = display_element;

    $(this.rootEl).html(
      `<div class="text-center"><h2 class="text-3xl font-medium tracking-wide">Phase ${this.phase}: Which family does the object belong to?`
    );
    console.log(this.rootEl);
  }

  private finishTrial() {
    this.jsPsych.finishTrial();
  }
}

export default QuestionsPlugin;
