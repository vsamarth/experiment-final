import "tailwindcss/tailwind.css";

import { initJsPsych } from "jspsych";
// import 'jspsych/css/jspsych.css';
import DemoPlugin from "./demo";
import QuestionsPlugin from "./questions";

const jsPsych = initJsPsych({
  display_element: document.getElementById("app"),
});

// const trial = {
//   type: DemoPlugin,
//   families: [
//     {name: 'Adams', images: [1231, 1322, 2333].map(x => `/images/fa1/fa1_${x}.gif`)},
//     {name: 'Adams', images: [1231, 1322].map(x => `/images/fa1/fa1_${x}.gif`)},
//     {name: 'Adams', images: [1231, 1322, 2333].map(x => `/images/fa1/fa1_${x}.gif`)},
//   ]
// }

const adamImages = [1231, 1322, 2333].map(x => `/images/fa1/fa1_${x}.gif`)

const trial = {
  type: QuestionsPlugin,
  phase: 1
};

jsPsych.run([trial]);
