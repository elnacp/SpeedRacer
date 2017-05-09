var renderer;
var scene;
var camera;

function init(){
    scene = new THREE.Scene();
    createRenderer();
    createCamera();
    //createBox();
    //createPlane();
    createUnivers();
    createEarth();
    createNubes();
    createLight();

    document.body.appendChild(renderer.domElement);
    render();
}

function render(){
    cameraControl.update();
    scene.getObjectByName('earth').rotation.y += 0.005;
    scene.getObjectByName('nubes').rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function createRenderer(){
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
}

function createCamera(){


    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/ window.innerHeight,
        0.1, 1000);
    cameraControl = new THREE.OrbitControls(camera);
    camera.position.x = 90;
    camera.position.y = 32;
    camera.position.z = 32;
    camera.lookAt(scene.position);
}

function createBox(){
    var boxGeometry = new THREE.BoxGeometry(6,4,6);
    var boxMaterial = new THREE.MeshLambertMaterial({
        color: "red"
    });
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    scene.add(box);
}

function createPlane(){
    var planeGeometry = new THREE.PlaneGeometry(20,20);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xcccccc
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -2;
    scene.add(plane);
}

function createLight(){
    //var spotLight = new THREE.SpotLight(0xffffff);
    //spotLight.position.set(10,20,20);
    //spotLight.shadow.camera.near = 20;
    //spotLight.shadow.camera.far = 50;
    //spotLight.castShadow = true;
    //scene.add(spotLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff,1);
    directionalLight.position.set(100, 10, -50);
    directionalLight.name = 'directional';
    scene.add(directionalLight);

    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

}

function createEarthMaterial(){
    var earthTexture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('assets/earthmap2k.jpg' , function(image) {
        earthTexture.image = image;
        earthTexture.needsUpdate = true;
    });
    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;

    var normalMap = new THREE.Texture();
    loader.load('assets/earth_normalmap_flat2k.jpg', function(image){
        normalMap.image = image;
        normalMap.needsUpdate = true;
    });
    earthMaterial.normalMap = normalMap;
    earthMaterial.normalScale = new THREE.Vector2(1.0,1.0);

    var specularMap = new THREE.Texture();
    loader.load('assets/earthspec2k.jpg', function(image){
        specularMap.image = image;
        specularMap.needsUpdate = true;
    });
    earthMaterial.specularMap = specularMap;
    earthMaterial.specular = new THREE.Color(0x262626);


    return earthMaterial;
}


function createEarth(){
    var sphereGeometry = new THREE.SphereGeometry(15, 30,30);
    var sphereMaterial = createEarthMaterial();
    sphereMaterial.transparent = false;
    var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'earth';
    scene.add(earthMesh);
}


function createNubesMaterial(){
    var earthTexture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('assets/fair_clouds_1k.png' , function(image) {
        earthTexture.image = image;
        earthTexture.needsUpdate = true;
    });
    var earthMaterial = new THREE.MeshBasicMaterial();
    earthMaterial.map = earthTexture;
    return earthMaterial;
}


function createNubes(){
    var sphereGeometry = new THREE.SphereGeometry(15.1,30,30);
    var sphereMaterial = createNubesMaterial();
    sphereMaterial.transparent = true;
    var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'nubes';
    scene.add(earthMesh);
}

function createUnivers(){
    var envGeometry = new THREE.SphereGeometry(90, 32, 32);
    var envMaterial = new THREE.MeshBasicMaterial();
    envMaterial.map = THREE.ImageUtils.loadTexture('assets/galaxy_starfield.png');
    envMaterial.side = THREE.BackSide;
    var envMesh = new THREE.Mesh(envGeometry, envMaterial);
    scene.add(envMesh);
}

//OBJECTE
function createFigure(){
    var material = new THREE.MeshPhongMaterial();
    loader = new THREE.OBJLoader();
    loader.load('assets/lee.obj', function(object){
       object.traverse(function (object) {
           if(child instanceof  THREE.Mesh){
               child.material = material;
               child.receiveShadow = true;
               child.castShadow = true;
           }
       });
       scene.add(object);
    });
}




init();