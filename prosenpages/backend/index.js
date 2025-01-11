import app from './app.js';//Manejo de servidor
import { portBack } from './config.js';//Numero de puerto a usar


console.log('\nIniciando servidor backend...');
app.listen(portBack);

console.log('Servidor esta corriendo en puerto',portBack,"!!\n","URL: http://localhost:"+portBack,"\n");