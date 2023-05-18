// const { Configuration, OpenAIApi } = require("openai");
// const fs = require("fs");
import { Configuration, OpenAIApi } from "openai";
import { apiKey } from "./secrets";

// require("dotenv").config();

const configuration = new Configuration({
  apiKey: apiKey, /////////////////////// DONT FORGET TO REMOVE WHEN PUSHING
});
const openai = new OpenAIApi(configuration);

export const initial_prompt = [
  {
    role: "system",
    content:
      "You are a career advisor that will help edit resumes for your client, the user.",
  },
  {
    role: "user",
    content: 'Act as a career advisor whose purpose to help maximize my chances of receiving an offer from a company I will tell you. Act like an interviewer during this conversation, and if I do not give examples during answers to your questions please ask for them again.',
  },
];

// var resume_prompt = [
//   {
//     role: "user",
//     content:
//       "I will now provide you with the pdf in text format. Check for grammatical errors and if possible reword or rewrite sentences to make it stronger.",
//   },
//   { role: "user", content: test_resume },
// ];
export async function compareResumeToJD(jd, prompt) {
  var newprompt =
    {
      role: "user",
      content: `Here is a job description for a job I want. How does my resume compare to the job description? Are there missing qualifications, and if so what resources should I consult for them? Also tell me if you think the job's field doesn't match my experience. ${jd}`,
    }
  //   ;
  // var jd_prompt = [{ role: "user", content: jd }]
  // newprompt = newprompt.concat(jd);

  prompt.push(newprompt);

  console.log(prompt);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
  });
  //   console.log(response.data.choices[0].message);
  var response_string = response.data.choices[0].message.content;

  prompt.push({ role: "assistant", content: response_string });
  // initial_prompt.push({role: "assistant", content: response_string});
  console.log("JD COMPARISON");

  console.log(response_string);
  console.log(prompt);
  return [response_string, prompt];
}

export async function mockInterviewConversation(new_input, old_convo) {
  if (old_convo == null || old_convo == undefined) {
    ; //Should input old conversation that had resume review in here.
  }
  let new_convo = old_convo.concat(new_input);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
  });
  var response_string = response.data.choices[0].message.content;
  new_convo.push({ role: "assistant", content: response_string }); //adds newly generated response to the conversation

  return [response_string, new_convo]; //returns the response string and the new conversation that will be saved

}

export async function checkQualifications(jd, prompt) {
  var newprompt =
    {
      role: "user",
      content: `Here is a job description for a job I want. If it is a link, process the job description from the link. Instead of entering my resume, ask me if I have all of the qualifications one by one in detail and force me to give examples. For specific technical skills, if I say yes, ask me an interview style question and tell me if my knowledge is sufficient. If I don't have the qualifications, please outline and suggest ways to gain those skills in detail and slowly guide me through the steps I should take. Once you have gone through all the important qualifications, tell me if I am a good fit for the role. If not, suggest me what my next steps should be and tell me the name of a job that matches my skills and experience better and give me the following url with the name of the job in the keyword parameter with the proper %20 delimiters for url format: https://www.linkedin.com/jobs/search/?keywords= ${jd}`,
    }
  //   ;
  // var jd_prompt = [{ role: "user", content: jd }]
  // newprompt = newprompt.concat(jd);

  prompt.push(newprompt);

  console.log(prompt);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
  });
  //   console.log(response.data.choices[0].message);
  var response_string = response.data.choices[0].message.content;

  prompt.push({ role: "assistant", content: response_string });
  // initial_prompt.push({role: "assistant", content: response_string});
  console.log("JD COMPARISON");

  console.log(response_string);
  console.log(prompt);
  return [response_string, prompt];
}

export async function sendInput(input, prompt) {
  var newprompt =
    {
      role: "user",
      content: input,
    }
  //   ;
  // var jd_prompt = [{ role: "user", content: jd }]
  // newprompt = newprompt.concat(jd);

  prompt.push(newprompt);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
  });
  var response_string = response.data.choices[0].message.content;

  prompt.push({ role: "assistant", content: response_string });
  // initial_prompt.push({role: "assistant", content: response_string});
  return [response_string, prompt];
}

export async function runResponse(resume) {
  var initial_prompt = [
    {
      role: "system",
      content:
        "You are a career advisor that will help edit resumes for your client, the user.",
    },
    {
      role: "user",
      content: `Act as a career advisor whose purpose is to help maximize my chances of receiving an offer from a company I will tell you.
   You will first check my resume for grammar issues and replace words you see fit that will make the resume stronger. Please provide all the feedback after the revised resume and maintain that the first line of your response of the revised resume matches the first line of the inputted resume.
  Afterwards, I will prompt you with more information about the company, and revise my resume more to make the resume a better fit for the company.
  `,
    },
  ];

  var resume_prompt = [
    {
      role: "user",
      content:
        "I will now provide you with the pdf in text format. Check for grammatical errors and if possible reword or rewrite sentences to make it stronger.",
    },
    { role: "user", content: resume },
  ];

  let prompt = initial_prompt.concat(resume_prompt)

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
  });
  //   console.log(response.data.choices[0].message);
  var response_string = response.data.choices[0].message.content;

  prompt.push({ role: "assistant", content: response_string });
  // initial_prompt.push({role: "assistant", content: response_string});
  console.log([response_string, prompt]);
  return [response_string, prompt];
}

export function findResumeDiff(resume_string, old_resume_string) {
  var split_new_resume = resume_string.split("\n"); //Split the string into lines and then check the difference
  var split_old_resume = old_resume_string.split("\n");
  var i = 0;
  while (i < split_old_resume.length) {
    var old_line = split_old_resume[i];
    var new_line = split_new_resume[i];
    var old_line_split = old_line.split(" ");
    var new_line_split = new_line.split(" ");
    // console.log(old_line, new_line);
    for (var j = 0; j < old_line_split.length; j++) {
      if (old_line_split[j] != new_line_split[j]) {
        //diff exists
        // console.log(old_line_split[j], new_line_split[j])
        console.log(strikeThrough(old_line_split[j]), new_line_split[j]);
      }
    }
    i++;
  }
}

function strikeThrough(text) {
  return text
    .split("")
    .map((char) => char + "\u0336")
    .join("");
}

// runResponse(initial_prompt.concat(resume_prompt)).then((res) => {
//   resume_string = res["message"]["content"];
//   console.log(resume_string);
//   findResumeDiff(resume_string, test_resume);

//   // Write edited resume to 'updated_resume.txt' .
//   // fs.writeFile("updated_resume.txt", resume_string, (err) => {
//   //   // In case of a error throw err.
//   //   if (err) throw err;
//   // });
// });
// console.log(response_string);
// findResumeDiff(response_string, test_resume);
// const response = await openai.listEngines();
