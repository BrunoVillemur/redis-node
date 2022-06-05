# redis-node
## PASOS PARA EJECUTAR EL PROYECTO ##
1- Realizar un clone al repositorio utilizando el comando " git clone https://github.com/BrunoVillemur/redis-node.git "
2- Asegurarte de tener instalado Redis en la Pc, o tener un contenedor Doker con Redis instalado, y ejecutar " doker run -p 6379:6379 --name some-redis -d redis "
3- Ejecutar npm i
4- Ejecutar el comando npm run dev, esto hará que se abra el servidor en el puerto 3000
5-entrar a los url:
  -http://localhost:3000/character (muestra todos los personajes)
  -http://localhost:3000/character/1 (muestra un personaje en específico)
* Si se descarga el complemento de visual Studio Code "Rest Client" se puede ejecutar directamente del archivo characters.http
