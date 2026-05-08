import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export let volumeLiquido; 

export function carregarCopo(scene) {
    const loader = new GLTFLoader();
    
    const geometriaLiquido = new THREE.CylinderGeometry(0.11, 0.08, 0.22, 16);
    geometriaLiquido.translate(0, 0.11, 0); 

    const materialLiquido = new THREE.MeshStandardMaterial({
        color: 0xffc300, 
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
    });

    volumeLiquido = new THREE.Mesh(geometriaLiquido, materialLiquido);
    volumeLiquido.position.set(2.5, 0.35, 2.4);
    volumeLiquido.scale.set(1, 0.01, 1); 
    volumeLiquido.visible = false; 
    scene.add(volumeLiquido);

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

export function encherCopo(delta) {
    if (volumeLiquido && volumeLiquido.scale.y < 1.0) {
        volumeLiquido.visible = true;
        volumeLiquido.scale.y += delta * 0.3; 
    }
}

export function esvaziarCopo(delta) {
    if (volumeLiquido && volumeLiquido.scale.y > 0.01) {
        volumeLiquido.scale.y -= delta * 0.35; 
        if (volumeLiquido.scale.y <= 0.01) {
            volumeLiquido.scale.y = 0.01;
            volumeLiquido.visible = false; 
        }
    }
}