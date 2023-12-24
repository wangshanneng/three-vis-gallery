import "./style.css";

import VRHall from "./vrhall/index.js";
function main(params) {
  const vr = new VRHall({
    container: document.getElementById("root"),
  });
}
main();
