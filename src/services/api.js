import axios from 'axios';

/**
 * Para acessar a rota da api do node, precisamos executar o comando abaixo
 * 
 * $ adb reverse tcp:3333 tcp:3333
 * 
 * Pois o emulador possui uma maquina virtual, dessa forma possue localhost tbm. Sendo assim
 * precisamos expor a porta da api para o emulador
 */
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;