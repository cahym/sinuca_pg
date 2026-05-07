import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export function carregarPlaca(scene) {
    const loader = new GLTFLoader();
    loader.load(
        './models/neon_bar_sign.glb',
        (gltf) => {
            const placa = gltf.scene;
            placa.scale.set(0.5, 0.5, 0.5);
            placa.position.set(3, 4, -3.7);
            placa.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                    }
                }
            });
            scene.add(placa);
        },
        undefined,
        (error) => {
            console.error('Erro ao carregar placa:', error);
        }
    );
}