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
  console.log("Crawling data...");
  // make http call to url
  let response = await axios(url).catch((err) => console.error(err));

  if (response?.status !== 200) {
    console.log("Error occurred while fetching data");
    return;
  }
  return response;
};

const getHtml = async (links, type = "description") => {
  if (type == "description") {
    for (let i = 0; i < links.length; i++) {
      const data = await fetchData(`${links[i]}`).then((res) => {
        const html = res?.data || "";

        const $ = cheerio.load(html, { decodeEntities: false });

        $("body").find("style").remove();
        $("body").find("script").remove();
        $("body").find("link").remove();
        $("body").find("a").remove();

        const data = $("body").text().replace(/\s+/g, " ");

        fileWriter(`./description.txt`, data + "\n\n\n");
      });
    }
  } else if (type == "background") {
    for (let i = 0; i < links.length; i++) {
      const data = await fetchData(`${links[i]}`).then((res) => {
        const html = res?.data || "";

        const $ = cheerio.load(html, { decodeEntities: false });

        $("body").find("style").remove();
        $("body").find("script").remove();
        $("body").find("link").remove();
        $("body").find("a").remove();

        const data = $("body").text().replace(/\s+/g, " ");

        fileWriter(`./background.txt`, data + "\n\n\n");
      });
    }
  }
};

const processDocument = async () => {
  const questions = [
    "Given the provided background and the provided product features, create claims for potential patentable IP",
    "From all the provided content, find all the trademark usages, suggest potential trademarks, and describe who trademark can project you and your company",
    "Exam copyright usage on the website and in user submitted content, Describe how copyrights can secure the content",
    "Define what trade secrets are and how they apply to the project, Offer guidance on securing trade secrets",
  ];

  let answers = [];

  for (let i = 0; i < questions.length; i++) {
    const text = questions[i];

    let chatGPTMessage;
    try {
      const description = readFile(path.join(__dirname, "/result.txt"));

      chatGPTMessage = await chatGPT(description, `${text}`);

      answers.push(chatGPTMessage);
    } catch (error) {
      console.error(error);
    }
  }
  return answers;
};

export const handleFormSubmit = async (req, res) => {
  const files = req.files || [];

  const inputLinks = req.body.links || [];

  const bFiles = req.bFiles || [];

  const inputBLinks = req.body.BLinks || [];

  try {
    fs.writeFileSync(path.join(__dirname, "/result.txt"), "", "utf8");
  } catch (error) {
    console.error("Error writing the file:", error);
  }

  if (typeof inputLinks == "string") {
    let arr = [];
    arr.push(inputLinks);
    await getHtml(arr);
  } else {
    await getHtml(inputLinks);
  }

  if (typeof inputBLinks == "string") {
    let arr = [];
    arr.push(inputBLinks);
    await getHtml(arr, "background");
  } else {
    await getHtml(inputBLinks, "background");
  }

  let answers = [];

  if (files.length == 0) {
    answers = await processDocument();
    return res.status(200).json({
      message: "Files uploaded and processed successfully.",
      data: answers,
    });
  } else {
    for (let i = 0; i < files.length; i++) {
      const filePath = files[i].path;

      fs.promises
        .readFile(filePath)
        .then((data) => {
          const pdfData = new Uint8Array(data);

          pdfjs
            .getDocument({ data: pdfData })
            .promise.then(function (pdfDocument) {
              const numPages = pdfDocument.numPages;
              const textPromises = [];

              for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                textPromises.push(
                  pdfDocument.getPage(pageNumber).then(function (page) {
                    return page.getTextContent();
                  })
                );
              }

              return Promise.all(textPromises);
            })
            .then(async (pages) => {
              const text = pages
                .map(function (page) {
                  return page.items
                    .map(function (item) {
                      return item.str;
                    })
                    .join(" ");
                })
                .join("\n");

              fileWriter(`./result.txt`, text + "\n\n\n");

              answers = await processDocument();

              return res.status(200).json({
                message: "Files uploaded and processed successfully.",
                data: answers,
              });

              fs.promises
                .unlink(filePath)
                .then(() => {})
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};
