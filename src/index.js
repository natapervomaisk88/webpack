import { User } from "./User.js";
import "./styles/main.css";
import json from "./assets/data.json";
import csv from "./assets/cars.csv";
import xml from "./assets/data.xml";
import image from "./assets/web.png";
const user = new User("Bogdan", 21);
console.log(user, json, csv, xml);

const logo = document.querySelector(".logo");
logo.insertAdjacentHTML("beforeend", `<img src="${image}" alt="logo">`);
