import $ from "jquery";
import { nanoid } from "nanoid";
import { JsPsychPlugin, ParameterType, TrialType, JsPsych } from "jspsych";

const info = {
  name: "questions",
  parameters: {
    phase: {
      type: ParameterType.INT,
    },
    question: {
      type: ParameterType.OBJECT,
    },
  },
};

type Info = typeof info;

export type Question = {
  image: string;
  choices: string[];
  answerIndex?: number;
};

class QuestionsPlugin implements JsPsychPlugin<Info> {
  static info = info;
  private phase: number;
  private rootEl: HTMLElement;
  private question: Question;
  private choices: string[];
  constructor(private jsPsych: JsPsych) {}

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    this.phase = trial.phase;
    this.rootEl = display_element;

    $(this.rootEl).html(
      `<div class="text-center"><h2 class="text-3xl font-medium tracking-wide">Phase ${this.phase}: Which family does the object belong to?</h2></div>`
    );
    this.question = trial.question;
    this.choices = trial.question.choices;

    $(this.rootEl).append(
      `<div class="flex justify-center items-center mt-8 flex-col">
        <div id="banner" class="w-[640px] h-[480px] grid place-items-center">
          <button class="bg-blue-500 text-white py-2 px-4 rounded-md">Load the GIF!</button>
        </div> 
        <form id="form" class="flex flex-col gap-4 mt-8 items-center mb-4">
          <div class="flex gap-8 text-lg">
          ${this.choices
            .map((choice, index) => {
              return `<label class="flex items-center">
              <input type="radio" name="choice" value="${index}" />
              <span class="ml-2">${choice}</span>
            </label>`;
            })
            .join("")}
          </div>
          <button class="bg-blue-500 text-white py-2 px-4 rounded-md w-fit" type="submit">Submit</button>
        </form>
      </div>`
    );

    $("#banner button").on("click", () => {
      $("#banner").html(`<img src="${this.question.image}" />`);
    });

    $("#form").on("submit", (e) => {
      e.preventDefault();
      const choice = $('input[name="choice"]:checked').val();
      if (choice === undefined) {
        alert("Please select an answer");
        return;
      }
      const data = {
        kind: "demo",
        phase: this.phase,
        question: this.question,
        answer: choice,
      };
      // alert(JSON.stringify(data, null, 2));
      this.jsPsych.finishTrial(data);
    });
  }

  private finishTrial() {
    this.jsPsych.finishTrial();
    $(this.rootEl).html("");
  }
}

export default QuestionsPlugin;