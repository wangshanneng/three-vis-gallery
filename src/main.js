import "./style.css";

import VRHall from "./vrhall/index.js";
async function main(params) {
  const vr = new VRHall({
    container: document.getElementById("root"),
  });

 await vr.loadHall({
    url: "room1/msg.gltf", // 展厅的模型
    position: {
      x: 0,
      y: -0.2,
      z: 0
    },
    onProgress: (p) =>{
      console.log(p);
    },
  });
}
main();
