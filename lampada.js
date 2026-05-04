import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export function carregarLampada(scene) {
    const vertexShader = `
        uniform mat4 projectionMatrix;
        uniform mat4 modelViewMatrix;
        uniform mat3 normalMatrix;
        attribute vec3 position;
        attribute vec3 normal;
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        precision mediump float;
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
            // Cálculo básico de iluminação (Lambert) para não ficar "chapado"
            vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
            float lightIntensity = max(dot(vNormal, lightDirection), 0.4); 
            gl_FragColor = vec4(uColor * lightIntensity, 1.0);
        }
    `;

    const loader = new GLTFLoader();
    
    loader.load('./models/ceiling_lamp_flower_style.glb', (gltf) => {
        const lampada = gltf.scene;

        const box = new THREE.Box3().setFromObject(lampada);
        const size = box.getSize(new THREE.Vector3()).length();
        const scalar = 5 / size; 
        lampada.scale.set(scalar, scalar, scalar);
        lampada.position.set(0, 3, 0);

        lampada.traverse((child) => {
            if (child.isMesh) {
                
                let corBase = new THREE.Color(0xfad5b8); 

                child.material = new THREE.RawShaderMaterial({
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    uniforms: {
                        uColor: { value: new THREE.Vector3(corBase.r, corBase.g, corBase.b) }
                    }
                });
            }
        });

        scene.add(lampada);

        const spotLight = new THREE.SpotLight(0xffffff, 150);
        spotLight.position.set(0, 2.5, 0); 
        spotLight.angle = Math.PI / 3;
        spotLight.penumbra = 0.3;
        spotLight.target.position.set(0, 0, 0);
        
        scene.add(spotLight);
        scene.add(spotLight.target);
    });
}