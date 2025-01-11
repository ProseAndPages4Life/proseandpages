import { app, origenFront } from './app.js';//Manejo de servidor
import { portBack, portFront, siteFront } from './config.js';//Numero de puerto a usar

console.log('\nIniciando servidor backend...');
app.listen(portBack);

console.log('Servidor esta corriendo en puerto',portBack,"!!\n","URL: http://localhost:"+portBack,"\n");
console.log("Frontend con sitio",siteFront,"y puerto",portFront+"!\nURL: http:/"+origenFront)