import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export function carregarCopo(scene) {
    const loader = new GLTFLoader();
    loader.load(
        './models/copo_americano.glb',
        (gltf) => {
            const copo = gltf.scene;
            copo.scale.set(0.15, 0.15, 0.15);
            copo.position.set(2.5, 0.35, 2.4);
            copo.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                        // Configurar material para vidro
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: 0.3,
                            roughness: 0.1,
                            metalness: 0.0,
                            envMapIntensity: 1.0
                        });
                    }
                }
            });
            scene.add(copo);
        },
        undefined,
        (error) => {
            console.error('Erro ao carregar copo:', error);
        }
    );
}