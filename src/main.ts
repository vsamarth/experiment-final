import "tailwindcss/tailwind.css";

import { initJsPsych } from "jspsych";
import DemoPlugin from "./demo";
import QuestionsPlugin from "./questions";
import { phase1, phase2, phase3, phase4 } from "./data";
import jsPsychInstructions from "@jspsych/plugin-instructions";
import jsPsychPreload from "@jspsych/plugin-preload";
import "./main.css";
import { finalInstructions } from "./instructions";

const serverUrl = "https://novelobjects.sgp1.digitaloceanspaces.com";

const jsPsych = initJsPsych({
  display_element: document.getElementById("app"),
  on_finish: () => {
    // jatos.endStudy(jsPsych.data.get().json());
  },
}); 

const instructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="prose-lg">
    <h1>Instructions</h1>
    <p><b>Please read these instructions carefully! After this you will go through a simple demo
    of the experiment.</b></p>
    <p>This experiment will test you on recognizing Novel Objects.
    There are a total of 5 families of these objects, each with a different family name.</p>

    <p>We will reveal what they look like and the family names in the actual experiment. </p>

    The experiment has <b>4 phases</b>. Each phase consists of 2 parts: training and testing. 

    <h3>Training</h3>
    <p>In the training part of the first phase, you will be introduced to two new family of objects.
    During the training part of the remaining phases, you will be introduced to one new family of objects.
    </p>
    <p>You will be given 60 seconds to learn the features of the families in every phase. The
    objects will be continuously rotating and you have to do your best to learn the features of these
    objects.</p>

    <p>A yellow triangle will be flashed once during training and you are required to click on
     the button below the training gifs only when you see the shape appear. </p>

    <p>Once time is up, you will immediately move to the testing part of the phase.</p>
    <p class="font-bold">Press <kbd>Next</kbd> to move to the next page.</p>
    </div>   
    `,
    `
    <div class="prose-lg">
    <h1>Instructions</h1>
    <h3>Testing</h3>
    <p>In the testing part of the phase, you will be tested with a series of multiple choice questions.
    You will be shown objects belonging to the families you have seen and will have to identify which
    family it belongs to.</p>

    <p>For each question, there will be button that when clicked, a GIF will be presented to you.
    Note that the GIF can only be played once. so click the button only if you are ready.
    </p>

    <p>In the GIF, a grey screen with a black cross will appear for 2 seconds. After that an
    image of the object will appear for 200 milliseconds.</p>

    <p>You are to identify which family the object belongs to by choosing one of the options below the GIF. </p>

    <p class="font-bold">Press <kbd>Next</kbd> to move to the demo of the experiment.</p>
    </div>   
    `,
  ],
  allow_backward: false,
  key_forward: "Enter",
  show_clickable_nav: true,
};

 
/*
        fa1: "Addams",
        fa2: "Bennings",
        fb1: "Clark",
        fb3: "Davis",
        fc1: "Evans",
*/

const adamImages = [1231, 1322, 2333].map((x) => `/images/fa1/fa1_${x}.gif`);
const benningsImages = [1213, 2133, 2321].map(
  (x) => `${serverUrl}/images/fa2/fa2_${x}.gif`
);
const clarkImages = [1222, 1322, 2212].map((x) => `/images/fb1/fb1_${x}.gif`);
const davisImages = [1111, 1113, 1321].map((x) => `/images/fb3/fb3_${x}.gif`);
const evansImages = [1222, 2223, 3121].map((x) => `/images/fc1/fc1_${x}.gif`);

const adamTrial = {
  type: DemoPlugin,
  duration: 60,
  families: [
    { name: "Adams", images: adamImages.map((x) => `${serverUrl}${x}`) },
    { name: "Bennings", images: benningsImages },
  ],
};

const clarkTrial = {
  type: DemoPlugin,
  families: [
    {
      name: "Clark",
      images: [
        ...clarkImages,
        "/images/fa2_2321_to_fb1_3321.gif",
        "/images/fa1_3123_to_fb1_3122.gif",
        "/images/fa2_2321_to_fb1_2212.gif",
      ].map((x) => `${serverUrl}${x}`),
    },
  ],
  duration: 30,
};

const davisTrial = {
  type: DemoPlugin,
  families: [
    {
      name: "Davis",
      images: [
        ...davisImages,
        `/images/fa1_3212_to_fb3_1111.gif`,
        `/images/fa2_1213_to_fb3_3213.gif`,
        `/images/fb1_2212_to_fb3_2112.gif`,
      ].map((x) => `${serverUrl}${x}`),
    },
  ],
  duration: 30,
};

const evansTrial = {
  type: DemoPlugin,
  duration: 30,
  families: [
    {
      name: "Evans",
      images: [
        ...evansImages,
        "/images/fa2_3111_to_fc1_1222.gif",
        "/images/fa2_1213_to_fc1_3321.gif",
        "/images/fb3_1111_to_fc1_3313.gif",
      ].map((x) => `${serverUrl}${x}`),
    },
  ],
};

const demoQuestions = {
  type: DemoPlugin,
  families: [
    {
      name: "Cube",
      images: [
        "/images/demo/cube1.gif",
        "/images/demo/cube2.gif",
        "/images/demo/cube3.gif",
      ].map((x) => `${serverUrl}${x}`),
    },
  ],
  duration: 10,
};

const cubeQuestions = {
  type: QuestionsPlugin,
  phase: 0,
  question: {
    image: "/images/demo/cube2_a60_b300.gif",
    choices: ["Cube", "Sphere", "Cylinder"],
    answerIdx: 0,
  },
};

const thanksInstructions = {
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

const preload1 = {
  type: jsPsychPreload,
  images: [
    ...demoQuestions.families[0].images,
    ...adamImages,
    ...benningsImages,
    ...phase1.map((x) => x.question.image),
    ...clarkTrial.families[0].images,
    ...phase2.map((x) => x.question.image),

    ...davisTrial.families[0].images,
    ...phase3.map((x) => x.question.image),
    ...evansTrial.families[0].images,
    // ...phase4.map((x) => x.question.image),
  ],
};

let timeline = [
  instructions,
  preload1,
  demoQuestions,
  cubeQuestions,
  finalInstructions,
  adamTrial,
  ...phase1,
  clarkTrial,
  ...phase2,
  davisTrial,
  ...phase3,
  evansTrial,
  ...phase4,
  thanksInstructions,
];

jsPsych.run(timeline);
