import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export function carregarMesa(callback){

    const loader = new GLTFLoader();
    
    loader.load(
        './models/pool_table.glb', 
        (gltf) => {            
            const mesa = gltf.scene;
            
            const model = gltf.scene;
            model.scale.set(0.02, 0.02, 0.02); 
            
            mesa.add(model);

            mesa.position.set(0, 0, 0);

            callback(mesa);
            
        },
        undefined,
        (error) => {
            console.error("Erro ao carregar:", error);
        }
    );
}
