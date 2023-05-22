import QuestionsPlugin, { Question } from "./questions";

const server_url = `/output`;

const filters = [
  "gaussian_noise",
  "shot_noise",
  "impulse_noise",
  "defocus_blur",
  "glass_blur",
  // # # "motion_blur",
  // # # "zoom_blur",
  // # "snow",
  // # "frost",
  // # "fog",
  "brightness",
  "contrast",
  "elastic_transform",
  // "pixelate",
  "jpeg_compression",
];


// do product of filters and levels
let options = ['original'];

for (let i = 0; i < filters.length; i++) {
  options.push(`${filters[i]}/1`);
  options.push(`${filters[i]}/${filters[i] == 'contrast' ? 4 : 5}`);
}

const opt1 = [10, 8, 8, 7, 15, 14, 12, 11, 15, 5, 10, 0, 9, 4, 6, 12, 14, 7, 18, 16];

console.log(options);

export const phase1 = [
  "novel_gif_36ax36b/fa1/fa1_3123_a150_b160",
  "novel_gif_36ax36b/fa1/fa1_3123_a90_b270",
  "novel_gif_36ax36b/fa1/fa1_3123_a20_b300",
  "novel_gif_36ax36b/fa2/fa2_2321_a220_b210",
  "novel_gif_36ax36b/fa2/fa2_2321_a310_b200",
  "novel_gif_36ax36b/fa2/fa2_2321_a200_b320",
  "novel_gif_36ax36b/fa2/fa2_2321_a190_b300",
  "novel_gif_36ax36b/fa2/fa2_2321_a10_b190",
  "novel_gif_36ax36b/fa2/fa2_3111_a260_b130",
  "novel_gif_36ax36b/fa1/fa1_3212_a340_b130",
  "novel_gif_36ax36b/fa1/fa1_3212_a210_b210",
  "novel_gif_36ax36b/fa2/fa2_2321_a340_b60",
  "novel_gif_36ax36b/fa1/fa1_3123_a250_b70",
  "novel_gif_36ax36b/fa2/fa2_2321_a260_b340",
  "novel_gif_36ax36b/fa1/fa1_3123_a180_b90",
  "novel_gif_36ax36b/fa2/fa2_3111_a80_b30",
  "novel_gif_36ax36b/fa1/fa1_3212_a300_b340",
  "novel_gif_36ax36b/fa1/fa1_3123_a170_b100",
  "novel_gif_36ax36b/fa1/fa1_3123_a150_b210",
  "novel_gif_36ax36b/fa2/fa2_3111_a110_b170",
].map((image, index) => {
  const isFa1 = image.includes("fa1");
  // replace / with - to make it a valid filename
  const folder = options[opt1[index]];
  image = image.replace(/\//g, "-");
  return {
    type: QuestionsPlugin,
    question: {
      image: `${server_url}/${folder}/${image}.gif`,
      choices: ["Adams", "Bennings"],
      answerIndex: isFa1 ? 0 : 1,
    },
    phase: 1,
  };
});

export const phase2 = [
  "novel_gif_36ax36b/fa1/fa1_3123_a20_b320",
  "novel_gif_36ax36b/fb1/fb1_1222_a190_b310",
  "novel_gif_36ax36b/fa2/fa2_2321_a230_b290",
  "novel_gif_36ax36b/fa2/fa2_3111_a290_b220",
  "novel_gif_36ax36b/fa2/fa2_3111_a110_b60",
  "novel_gif_36ax36b/fa1/fa1_3123_a280_b90",
  "novel_gif_36ax36b/fb1/fb1_1322_a120_b70",
  "novel_gif_36ax36b/fa1/fa1_3212_a270_b280",
  "novel_gif_36ax36b/fb1/fb1_1222_a70_b0",
  "novel_gif_36ax36b/fa2/fa2_3111_a270_b230",
  "novel_gif_36ax36b/fa2/fa2_2321_a240_b140",
  "novel_gif_36ax36b/fb1/fb1_1222_a140_b190",
  "novel_gif_36ax36b/fa1/fa1_3123_a190_b210",
  "novel_gif_36ax36b/fb1/fb1_1222_a210_b270",
  "novel_gif_36ax36b/fb1/fb1_1222_a40_b320",
  "novel_gif_36ax36b/fb1/fb1_1322_a260_b10",
  "novel_gif_36ax36b/fa1/fa1_3123_a200_b190",
  "novel_gif_36ax36b/fa2/fa2_3111_a210_b130",
  "novel_gif_36ax36b/fa2/fa2_3111_a40_b140",
  "novel_gif_36ax36b/fa2/fa2_2321_a210_b170",
  "novel_gif_36ax36b/fb1/fb1_1222_a230_b120",
  "novel_gif_36ax36b/fb1/fb1_1222_a210_b210",
  "novel_gif_36ax36b/fa2/fa2_2321_a310_b140",
  "novel_gif_36ax36b/fa1/fa1_3123_a50_b280",
  "novel_gif_36ax36b/fa2/fa2_2321_a260_b130",
  "novel_gif_36ax36b/fa1/fa1_3123_a10_b350",
  "novel_gif_36ax36b/fa1/fa1_3212_a330_b310",
  "novel_gif_36ax36b/fa1/fa1_3212_a230_b320",
  "novel_gif_36ax36b/fb1/fb1_1222_a260_b350",
  "novel_gif_36ax36b/fa1/fa1_3123_a230_b210",
].map((image, index) => {
  return {
    type: QuestionsPlugin,
    question: {
      image: `${server_url}${image}.gif`,
      choices: ["Adams", "Bennings", "Clark"],
      // answerIndex: isFa1 ? 0 : 1,
    },
    phase: 2,
  };
});

export const phase3 = [
  "novel_gif_36ax36b/fa1/fa1_3212_a0_b310",
  "novel_gif_36ax36b/fb1/fb1_1222_a210_b130",
  "novel_gif_36ax36b/fb1/fb1_1322_a240_b230",
  "novel_gif_36ax36b/fa2/fa2_3111_a250_b220",
  "novel_gif_36ax36b/fa2/fa2_2321_a260_b70",
  "novel_gif_36ax36b/fa1/fa1_3123_a260_b200",
  "novel_gif_36ax36b/fa1/fa1_3212_a280_b180",
  "novel_gif_36ax36b/fb3/fb3_1321_a40_b60",
  "novel_gif_36ax36b/fa2/fa2_2321_a260_b0",
  "novel_gif_36ax36b/fa2/fa2_3111_a190_b90",
  "novel_gif_36ax36b/fa1/fa1_3123_a130_b10",
  "novel_gif_36ax36b/fb1/fb1_1322_a320_b40",
  "novel_gif_36ax36b/fb1/fb1_1322_a240_b350",
  "novel_gif_36ax36b/fb3/fb3_1321_a340_b30",
  "novel_gif_36ax36b/fa2/fa2_2321_a200_b60",
  "novel_gif_36ax36b/fa2/fa2_2321_a260_b160",
  "novel_gif_36ax36b/fa1/fa1_3212_a200_b220",
  "novel_gif_36ax36b/fb3/fb3_1321_a230_b80",
  "novel_gif_36ax36b/fb3/fb3_1321_a40_b20",
  "novel_gif_36ax36b/fa1/fa1_3123_a160_b150",
  "novel_gif_36ax36b/fa1/fa1_3123_a50_b330",
  "novel_gif_36ax36b/fb1/fb1_1322_a300_b210",
  "novel_gif_36ax36b/fb3/fb3_2112_a300_b30",
  "novel_gif_36ax36b/fb1/fb1_1222_a70_b280",
  "novel_gif_36ax36b/fb3/fb3_2112_a110_b190",
  "novel_gif_36ax36b/fb1/fb1_1222_a220_b50",
  "novel_gif_36ax36b/fa1/fa1_3123_a60_b330",
  "novel_gif_36ax36b/fb3/fb3_2112_a270_b170",
  "novel_gif_36ax36b/fb3/fb3_1321_a200_b130",
  "novel_gif_36ax36b/fa2/fa2_3111_a170_b40",
  "novel_gif_36ax36b/fa2/fa2_2321_a50_b30",
  "novel_gif_36ax36b/fb1/fb1_1322_a120_b160",
  "novel_gif_36ax36b/fa2/fa2_2321_a170_b30",
  "novel_gif_36ax36b/fb1/fb1_1222_a0_b80",
  "novel_gif_36ax36b/fa2/fa2_2321_a290_b40",
  "novel_gif_36ax36b/fa1/fa1_3123_a30_b170",
  "novel_gif_36ax36b/fb1/fb1_1322_a170_b310",
  "novel_gif_36ax36b/fb3/fb3_2112_a240_b320",
  "novel_gif_36ax36b/fb3/fb3_1321_a50_b170",
  "novel_gif_36ax36b/fa1/fa1_3123_a50_b170",
].map((image, index) => {
  return {
    type: QuestionsPlugin,
    question: {
      image: `${server_url}${image}.gif`,
      choices: ["Adams", "Bennings", "Clark", "Davis"],
    },
    phase: 3,
  };
});

export const phase4 = [
  "novel_gif_36ax36b/fb3/fb3_1321_a120_b180",
  "novel_gif_36ax36b/fc1/fc1_1222_a160_b250",
  "novel_gif_36ax36b/fb3/fb3_1321_a70_b210",
  "novel_gif_36ax36b/fa2/fa2_2321_a160_b80",
  "novel_gif_36ax36b/fa1/fa1_3212_a100_b90",
  "novel_gif_36ax36b/fa1/fa1_3212_a130_b200",
  "novel_gif_36ax36b/fa1/fa1_3212_a0_b150",
  "novel_gif_36ax36b/fa2/fa2_3111_a200_b10",
  "novel_gif_36ax36b/fb1/fb1_1222_a240_b180",
  "novel_gif_36ax36b/fc1/fc1_1222_a10_b50",
  "novel_gif_36ax36b/fc1/fc1_1222_a140_b30",
  "novel_gif_36ax36b/fb1/fb1_1322_a290_b280",
  "novel_gif_36ax36b/fb1/fb1_1322_a90_b40",
  "novel_gif_36ax36b/fa1/fa1_3212_a290_b20",
  "novel_gif_36ax36b/fb1/fb1_1222_a230_b140",
  "novel_gif_36ax36b/fa2/fa2_3111_a260_b220",
  "novel_gif_36ax36b/fb1/fb1_1222_a40_b0",
  "novel_gif_36ax36b/fa2/fa2_2321_a10_b280",
  "novel_gif_36ax36b/fb1/fb1_1222_a290_b80",
  "novel_gif_36ax36b/fa2/fa2_2321_a140_b150",
  "novel_gif_36ax36b/fc1/fc1_2223_a340_b10",
  "novel_gif_36ax36b/fb3/fb3_2112_a290_b40",
  "novel_gif_36ax36b/fb1/fb1_1322_a100_b80",
  "novel_gif_36ax36b/fc1/fc1_1222_a220_b210",
  "novel_gif_36ax36b/fa1/fa1_3212_a10_b80",
  "novel_gif_36ax36b/fc1/fc1_1222_a200_b10",
  "novel_gif_36ax36b/fa2/fa2_3111_a300_b50",
  "novel_gif_36ax36b/fb3/fb3_2112_a230_b90",
  "novel_gif_36ax36b/fb3/fb3_2112_a340_b60",
  "novel_gif_36ax36b/fb3/fb3_2112_a320_b50",
  "novel_gif_36ax36b/fb1/fb1_1222_a170_b180",
  "novel_gif_36ax36b/fa2/fa2_2321_a270_b220",
  "novel_gif_36ax36b/fc1/fc1_2223_a160_b160",
  "novel_gif_36ax36b/fb1/fb1_1322_a10_b20",
  "novel_gif_36ax36b/fa2/fa2_2321_a350_b230",
  "novel_gif_36ax36b/fa1/fa1_3123_a70_b330",
  "novel_gif_36ax36b/fa1/fa1_3123_a280_b10",
  "novel_gif_36ax36b/fa1/fa1_3212_a250_b300",
  "novel_gif_36ax36b/fa2/fa2_2321_a280_b240",
  "novel_gif_36ax36b/fb3/fb3_2112_a170_b310",
  "novel_gif_36ax36b/fb3/fb3_1321_a80_b30",
  "novel_gif_36ax36b/fc1/fc1_2223_a130_b280",
  "novel_gif_36ax36b/fc1/fc1_1222_a150_b330",
  "novel_gif_36ax36b/fb3/fb3_2112_a250_b90",
  "novel_gif_36ax36b/fa1/fa1_3212_a0_b80",
  "novel_gif_36ax36b/fb3/fb3_1321_a240_b120",
  "novel_gif_36ax36b/fc1/fc1_2223_a200_b140",
  "novel_gif_36ax36b/fa2/fa2_2321_a0_b100",
  "novel_gif_36ax36b/fb1/fb1_1322_a20_b80",
  "novel_gif_36ax36b/fa1/fa1_3123_a60_b130",
].map((image, index) => {
  return {
    type: QuestionsPlugin,
    question: {
      image: `${server_url}${image}.gif`,
      choices: ["Adams", "Bennings", "Clark", "Davis", "Evans"],
    },
    phase: 4,
  };
});
