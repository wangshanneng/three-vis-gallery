import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class VRHall {
  constructor(options) {
    this._options = Object.assign(
      {
        container: document.body,
      },
      options
    );
    this._init();
    this._animate();
  }

  _init() {
    // 创建渲染器
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    const { clientWidth, clientHeight } = this._options.container;

    this._renderer.setSize(clientWidth, clientHeight);
    this._options.container.appendChild(this._renderer.domElement);

    // 场景
    this._scene = new THREE.Scene();

    // 相机
    this._camera = new THREE.PerspectiveCamera(
      70,
      clientWidth / clientHeight,
      0.1,
      10000
    );
    this._camera.position.set(1, 1, 10);
    this._scene.add(this._camera);

    // 环境光
    this._scene.add(new THREE.AmbientLight(0xffffff, 1));

    this._scene.add(new THREE.AxesHelper(10000));

    this._renderer.render(this._scene, this._camera);

    // 控制器
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.update();
  }
  _animate() {
    requestAnimationFrame(this._animate.bind(this));
    this._renderer.render(this._scene, this._camera);
    this._controls.update();
  }
}
