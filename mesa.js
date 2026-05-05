import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

export function carregarMesa(scene){
    loader.load(
        './models/pool_table.glb', 
        (gltf) => {            
            const mesa = gltf.scene;
            
            mesa.scale.set(0.02, 0.02, 0.02); 
            mesa.position.set(0, 0, 0);

            const colorPT = textureLoader.load('./textures/pool_table_color.jpg');
            const normalPT = textureLoader.load('./textures/pool_table_normalgl.jpg');
            const roughnessPT = textureLoader.load('./textures/pool_table_roughness.jpg');

            const colorM = textureLoader.load('./textures/metal_color.jpg');
            const normalM = textureLoader.load('./textures/metal_NormalGL.jpg');
            const roughnessM = textureLoader.load('./textures/metal_roughness.jpg');

            const colorF = textureLoader.load('./textures/floor_color.jpg');
            const normalF = textureLoader.load('./textures/floor_normalgl.jpg');
            const roughnessF = textureLoader.load('./textures/floor_roughness.jpg');

            colorPT.colorSpace = THREE.SRGBColorSpace;
            colorM.colorSpace = THREE.SRGBColorSpace;
            colorF.colorSpace = THREE.SRGBColorSpace;

            mesa.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                }
                if (child.isMesh && child.material.name === 'Material.001') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: colorPT,
                        normalMap: normalPT,
                        roughnessMap: roughnessPT,
                        roughness: 1.0,
                        metalness: 0.0,
                        color: 0xffffff
                    });
                }
                if (child.isMesh && (child.material.name === 'Material.003' || child.material.name === 'Material.005')) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: colorPT,
                        normalMap: normalPT,
                        roughnessMap: roughnessPT,
                        roughness: 1.0,
                        metalness: 0.0,
                        color: 0xaaaaaa
                    });
                }
                if (child.isMesh && child.material.name === 'Material.002') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: colorM,
                        normalMap: normalM,
                        roughnessMap: roughnessM,
                        roughness: 0.5,
                        metalness: 1,
                        color: 0xffffff
                    });
                }

                if (child.isMesh && child.material.name === 'Material') {
                    child.material.color.set(0x5a0f0f);
                    child.material.needsUpdate = true;
                }

                if (child.isMesh && child.material.name === 'Material.006') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: colorF,
                        normalMap: normalF,
                        roughnessMap: roughnessF,
                        roughness: 1,
                        metalness: 0,
                        color: 0x555555
                    });
                }
            });

            scene.add(mesa);
        },
        undefined,
        (error) => {
            console.error("Erro ao carregar:", error);
        }
    );
}
