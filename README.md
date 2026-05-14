#Integrantes: Caio Jansen C. do Nascimento (832262), Camila Yasmin Martins (831424), Nicolas Marques (832533), Lucas Frias (821784)

#Tema do Projeto: Cena de um bar focada em uma mesa de sinuca.

#O trabalho teve controle de versão pelo GitHub, onde cada integrante contribuiu diretamente com commits em suas contas pessoais para manter o histórico transparente.

#Execução do Projeto: Para rodar e visualizar a cena localmente no navegador, utilizamos a extensão Live Server do VS Code. Para testar, basta abrir a pasta principal do projeto no editor de código e iniciar o Live Server.

#Composição da Cena: Criamos uma cena 3D completa com 8 modelos importados no formato .glb. Para cumprir o requisito de visualização e posicionamento individual de pelo menos um objeto por membro, os quatro primeiros implementados foram a mesa, a bola, a luminária e o taco. Os outros quatro (garrafa de cerveja, copo, giz e placa neon) garantem o cumprimento da especificação dos objetos extras e compõem o cenário do bar. Cada modelo foi redimensionado e posicionado individualmente no ambiente.

#Conclusão de cenário e profundidade: Construímos 3 paredes em volta da mesa utilizando a geometria nativa PlaneGeometry.

#Aplicação de texturas: visual realista alcançado  através do TextureLoader, onde aplicamos os mapas de Cor (Diffuse), Normal Map (relevo) e Roughness (rugosidade) nas paredes de tijolo, no chão e nos diferentes materiais da mesa de sinuca (como a madeira e os metais).

#Iluminação e Pós-Processamento: A luz base do ambiente vem de uma AmbientLight combinada com uma DirectionalLight que gera as sombras dinâmicas. Dentro da luminária de teto, configuramos uma SpotLight voltada para o centro da mesa. Utilizamos também do EffectComposer e do UnrealBloomPass, criando o brilho em volta da placa neon e nos reflexos da cena.

#Shaders Customizados: Cumprimos a exigência de utilizar um shader próprio ao desenvolvermos o material da luminária com RawShaderMaterial. O Vertex Shader calcula as posições e exporta as normais da malha, enquanto o Fragment Shader utiliza o modelo de iluminação de Lambert. Isso garante que a cúpula tenha volume e sombra calculados manualmente na GPU, sem recorrer aos materiais prontos do Three.js.

#Sistema de Câmeras: Atendendo ao requisito de implementar pelo menos duas câmeras, a interface HTML conta com botões que permitem alternar entre duas PerspectiveCameras: uma com visão padrão (inclinada, de frente) e outra com visão superior.

#Parte Extra e Animações: O requisito de movimento foi atendido com duas animações interativas. A primeira é o deslocamento da bola 8, que avança e rotaciona ao mesmo tempo, executando o movimento uma vez (com um botão na interface para reiniciar). A segunda é a garrafa de cerveja servindo o copo em loop. Para programar isso de forma organizada, usamos uma lógica de máquina de estados, dividindo a animação em fases sequenciais: o código garante que a garrafa primeiro suba, depois incline e só então encha o copo, repetindo esse ciclo de forma controlada e sem atropelar os movimentos.