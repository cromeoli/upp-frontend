![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)


<div align="center"><a href="https://upp.lol/"><img src="https://github.com/cromeoli/upp-backend-laravel/assets/92324278/fa030cf2-b533-41af-8162-063937f98c94"></a></div>

## Update 2024: Actualmente fuera de producción debido a costes.

## Instalación
> [!IMPORTANT]  
> Para que la aplicación funcione, será necesario que tanto el **backend** como el **frontend** de la aplicación estén desplegados. 
> 
> Puedes acceder al backend aquí:
> ### [Upp Backend](https://github.com/cromeoli/upp-backend-laravel)
> 

Para instalar el frontend tan solo es necesario seguir los siguientes pasos:
1. Clonar mediante git u otro sistema de control de versiones el proyecto desde la siguiente URL: https://github.com/cromeoli/pwa-tests.git
2. Una vez clonado el proyecto, debemos ubicarnos en el directorio donde lo hemos clonado y entrar a la carpeta raíz del proyecto. Una vez dentro ejecutamos el siguiente comando:  

```
npm install
```

3. Con el anterior comando deberíamos de haber instalado las dependencias para nuestro proyecto. A continuación para lanzar el servidor de desarrollo en nuestra máquina usaremos el siguiente comando:

```
npm run dev -- --host
```

Habiendo seguido estos pasos debería ser posible ver acceder al proyecto en localhost:3000 (o 3001/3002… dependiendo de si están ocupados se intentará levantar el servidor en cualquiera de los puertos posteriores al 3000 que estén disponibles).

#### Nota
Es importante saber que en el archivo /src/environments/environment.ts se encuentran 2 variables importantes: API e IMAGE. Habrá 4 variables, 2 API y 2 IMAGE, pero una de cada una debería estar comentada. Este archivo establece la ruta a la que las peticiones se van a hacer, al servidor de nuestra maquina local (localhost) o al servidor en railway desplegado.
