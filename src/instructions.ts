import jsPsychInstructions from "@jspsych/plugin-instructions";

export const thanksInstructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="prose-lg">
      <h1>Thanks!</h1>
      <p>
      That's it for the experiment. Thank you for participating!
      </p>
      </div>
      `,
  ],
  allow_backward: false,
  key_forward: "Enter",
  show_clickable_nav: true,
};

export const finalInstructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="prose-lg">
      <h1>Instructions</h1>
      <p>
      That's it for the demo. Press <kbd>Next</kbd> to move to the actual experiment.
      </p>
      </div>   
      `,
  ],
  allow_backward: false,
  key_forward: "Enter",
  show_clickable_nav: true,
};
