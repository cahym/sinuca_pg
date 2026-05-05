import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export function carregarTaco(scene) {

    const loader = new GLTFLoader();

    loader.load(
        './models/cue_stick.glb', 
        (gltf) => {
            const taco = gltf.scene;

            taco.scale.set(4, 4, 4); 

            taco.position.set(-4.7, -0.08, 0); 

            taco.rotation.set(1, 0, 0.5);
            
            taco.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x4b2d1e,
                        roughness: 0.5,
                        metalness: 0.1
                    });
                }
            });

            scene.add(taco);
        },
        (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% carregado'); },
        (error) => { console.error("ERRO NO CAMINHO DO ARQUIVO:", error); }
    );
}