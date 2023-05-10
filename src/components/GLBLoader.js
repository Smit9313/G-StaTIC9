import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';



const GLBLoader = ({ url }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();  // creating scene which holds everything(background, model, lights, camera, etc.)


    // =============== Setting up camera to view the scene ===============
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100000
    );
    camera.position.set(0, 0, 4)
    camera.lookAt(scene.position);
    // ===================================================================


    // ========== Setting up renderer for rendering all of this ==========
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // enable transparent background
      precision: 'highp'
    });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);


    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    // ===================================================================


    // =================== Addding background to scene ===================
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var texture = new THREE.CanvasTexture(canvas, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping, THREE.LinearFilter, THREE.LinearMipmapLinearFilter);
    texture.encoding = THREE.sRGBEncoding;
    scene.background = texture;


    const rbgeloader = new RGBELoader();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    rbgeloader.setDataType(THREE.UnsignedByteType);

    rbgeloader.load('sd.hdr', (hdrtexture) => {
      hdrtexture.mapping = THREE.EquirectangularReflectionMapping;
      const envMap = pmremGenerator.fromEquirectangular(hdrtexture).texture;
      hdrtexture.encoding = THREE.RGBEEncoding;
      texture.image = envMap;
      texture.needsUpdate = true;
      hdrtexture.minFilter = THREE.NearestFilter;
      hdrtexture.magFilter = THREE.NearestFilter;
      hdrtexture.format = THREE.RGBAFormat;

      // texture.generateMipmaps = false;
      scene.background = envMap;
      scene.environment = envMap;
      // texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      // scene.userData.envMap = envMap;


      // texture.dispose();
      // pmremGenerator.dispose();

      // const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
      // const material = new THREE.MeshBasicMaterial({ map: texture });
      // material.side = THREE.BackSide; // render the material on the back side of the mesh
      // const background = new THREE.Mesh(geometry, material)
      // background.position.set(1, 0, 0); // move the background by (1, 0, 0)
    });
    // ===================================================================


    // ====================== Loading the 3d model =======================
    const loader = new GLTFLoader();
    loader.load(url, (geometry) => {
      var Model = geometry.scene;

      var box3 = new THREE.Box3();
      box3.expandByObject(Model);

      var center = new THREE.Vector3();
      box3.getCenter(center);
      Model.position.y = Model.position.y - center.y;
      Model.position.x = Model.position.x - center.x;
      Model.position.z = Model.position.z - center.z;
      scene.add(Model);
  });
    // ===================================================================


    // ====== Adding controls for rotating and playing with object =======
    var Controls = new OrbitControls(camera, renderer.domElement);
    Controls.autoRotate = true;
    const animate = () => {

      renderer.render(scene, camera);
      Controls.update();
      requestAnimationFrame(animate);
    };
    animate();
    // ===================================================================

    // ======== For adjusting the scene when we resize the window ========
    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    // ===================================================================

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, [url]);

  return <div style={{ height: '75vh', width: '100vw' }} ref={containerRef} />;
};

export default GLBLoader;
