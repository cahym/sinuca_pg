import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export function carregarGiz(scene) {
    const loader = new GLTFLoader();
    loader.load(
        './models/billiard_chalk.glb',
        (gltf) => {
            const giz = gltf.scene;
            giz.scale.set(0.02, 0.02, 0.02);
            giz.position.set(-1.7, 0.37, 2.4);
            giz.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                    }
                }
            });
            scene.add(giz);
        },
        undefined,
        (error) => {
            console.error('Erro ao carregar giz:', error);
        }
    );
}