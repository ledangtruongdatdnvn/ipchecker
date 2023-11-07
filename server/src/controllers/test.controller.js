import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import pdfjs from "pdfjs-dist";
import { readFile } from "../../utils/fileProcessor.js";
import { chatGPT } from "../../utils/openAIProcessor.js";

import path from "path";
const __dirname = path.resolve();

const fileWriter = (filename, data) => {
  fs.appendFileSync(filename, data, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    // success case, the file was saved
  });
};

const fetchData = async (url) => {
  // make http call to url
  let response = await axios(url).catch((err) => console.error(err));

  if (response?.status !== 200) {
    console.log("Error occurred while fetching data");
    return;
  }
  return response;
};

const getHtml = async (links) => {
  let result = "";
  for (let i = 0; i < links.length; i++) {
    const data = await fetchData(`${links[i]}`).then((res) => {
      const html = res?.data || "";

      const $ = cheerio.load(html, { decodeEntities: false });

      $("body").find("style").remove();
      $("body").find("script").remove();
      $("body").find("link").remove();
      $("body").find("a").remove();

      const data = $("body").text().replace(/\s+/g, " ");

      result = result + data + "\n\n\n";
    });
  }
  return result;
};

const extractTextFromPDF = async (filePath) => {
  const data = fs.readFileSync(filePath);

  const pdfData = new Uint8Array(data);

  const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;

  const numPages = pdfDocument.numPages;

  const textContent = [];

  for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    textContent.push(pageText);
  }

  return textContent.join("\n\n\n");
};
const getFileContent = async (files) => {
  let result = "";

  for (const file of files) {
    const filePath = file.path;

    const text = await extractTextFromPDF(filePath);
    result += text + "\n\n\n";
  }

  return result;
};

const processDocument = async (description, background) => {
  const questions = [
    "Given the provided background and the provided product features, create claims for potential patentable IP",
    "From all the provided content, find all the trademark usages, suggest potential trademarks, and describe who trademark can project you and your company",
    "Exam copyright usage on the website and in user submitted content, Describe how copyrights can secure the content",
    "Define what trade secrets are and how they apply to the project, Offer guidance on securing trade secrets",
  ];

  let context = "";

  if (description.length > 0) {
    context =
      context +
      "Here is Description (please upload your document(s) or specify web page link(s) that have your product features or product description): \n\n\n" +
      description;
  }

  if (background.length > 0) {
    context =
      context +
      "\n\n\n" +
      "Here is Background (Optional- please upload your document/pitch desk or specify web page links that have your product background and/or your mission statement): \n\n\n" +
      background;
  }

  // console.log(context);

  let answers = [];

  for (let i = 0; i < questions.length; i++) {
    const text = questions[i];

    let chatGPTMessage;

    try {
      chatGPTMessage = await chatGPT(context, `${text}`);

      // console.log(chatGPTMessage);

      answers.push(chatGPTMessage);
    } catch (error) {
      console.error(error);
    }
  }
  return answers;
};

export const handleFormSubmit = async (req, res) => {
  const files = req.files.files || [];

  const inputLinks = req.body.links || [];

  const bFiles = req.files.bFiles || [];

  const inputBLinks = req.body.bLinks || [];

  let description = "";

  let background = "";

  if (typeof inputLinks == "string") {
    // one link
    let arr = [];
    arr.push(inputLinks);
    description = await getHtml(arr);
  } else {
    // multiple links
    description = await getHtml(inputLinks);
  }

  if (typeof inputBLinks == "string") {
    let arr = [];
    arr.push(inputBLinks);
    background = await getHtml(arr);
  } else {
    background = await getHtml(inputBLinks);
  }

  let answers = [];

  if (files.length > 0) {
    try {
      const f = await getFileContent(files);
      description = description + f;
    } catch (error) {
      console.error(error);
    }
  }
  if (bFiles.length > 0) {
    try {
      const b = await getFileContent(bFiles);
      background = background + b;
    } catch (error) {
      console.error(error);
    }
  }

  answers = await processDocument(description, background);

  return res.status(200).json({
    message: "Files uploaded and processed successfully.",
    data: answers,
  });
};
