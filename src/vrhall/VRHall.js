import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class VRHall {
  constructor(options) {
    this._options = Object.assign(
      {
        container: document.body,
      },
      options
    );
    // 实例化模型方法
    this._gltfLoader = new GLTFLoader();
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
  // 加载展厅
  async loadHall(params) {
    const { url, position, scale, onProgress } = params;
    const gltf = await this.loadGltf({ url, onProgress });
    if (position) {
      // 场景级-位置设置
      gltf.scene.position.set(position.x, position.y, position.z);
    }
    this._scene.add(gltf.scene);
  }

  // 加载模型
  loadGltf(params) {
    const { url, onProgress } = params;

    return new Promise((resolve, reject) => {
      this._gltfLoader.load(
        url,
        (gltf) => {
          resolve(gltf);
        },
        (progress) => {
          // 如果自定义，则返回进度
          if (onProgress) {
            onProgress(progress);
          }
        }
      );
    });
  }
}
