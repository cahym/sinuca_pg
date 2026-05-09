import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

let cervejaObj = null;
let fioDeLiquido = null;
let animando = false;
let tempoAnimacao = 0;

export function carregarCerveja(scene) {
    const loader = new GLTFLoader();
    
    const geometriaFio = new THREE.CylinderGeometry(0.005, 0.005, 0.8, 8);
    geometriaFio.translate(0, -0.4, 0); 
    const materialFio = new THREE.MeshBasicMaterial({ 
        color: 0xffc300, 
        transparent: true, 
        opacity: 0.7 
    });
    fioDeLiquido = new THREE.Mesh(geometriaFio, materialFio);
    fioDeLiquido.visible = false;
    scene.add(fioDeLiquido);

    loader.load(
        './models/beer_bottle.glb',
        (gltf) => {
            cervejaObj = gltf.scene;
            cervejaObj.scale.set(0.2, 0.2, 0.2);
            cervejaObj.position.set(1.4, 0.35, 2.4);
            cervejaObj.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                    }
                }
            });
            scene.add(cervejaObj);
        },
        undefined,
        (error) => {
            console.error('Erro ao carregar cerveja:', error);
        }
    );
}

export function servirCerveja() {
    if (!animando && cervejaObj) {
        animando = true;
        tempoAnimacao = 0;
    }
}

export function atualizarCerveja(delta) {
    if (!animando || !cervejaObj) return 'parado';

    tempoAnimacao += delta;
    let estado = 'animando';

    if (tempoAnimacao <= 1.5) {
        const progresso = tempoAnimacao / 1.5;
        cervejaObj.position.y = 0.35 + (0.5 * progresso); 
    } 

    else if (tempoAnimacao > 1.5 && tempoAnimacao <= 2.5) {
        const progresso = (tempoAnimacao - 1.5);
        cervejaObj.rotation.z = -Math.PI / 2.5 * progresso; 
    }
    
    else if (tempoAnimacao > 2.5 && tempoAnimacao <= 5.5) {
        estado = 'servindo';
        fioDeLiquido.visible = true;
      
        fioDeLiquido.position.set(2.46, 1.20, 2.4);
    }

    else if (tempoAnimacao > 5.5 && tempoAnimacao <= 6.5) {
        estado = 'voltando';
        fioDeLiquido.visible = false;
        const progresso = (tempoAnimacao - 5.5);
        cervejaObj.rotation.z = (-Math.PI / 2.5) * (1 - progresso); 
    }
 
    else if (tempoAnimacao > 6.5 && tempoAnimacao <= 8.0) {
        estado = 'voltando';
        const progresso = (tempoAnimacao - 6.5) / 1.5;
        cervejaObj.position.y = 0.85 - (0.5 * progresso);
    }
   
    else if (tempoAnimacao > 8.0) {
        animando = false;
        cervejaObj.position.set(1.4, 0.35, 2.4);
        cervejaObj.rotation.z = 0;
        estado = 'parado';
    }

    return estado; 
}