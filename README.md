# Upp

## Resumen de la aplicación

Upp es una red social basada en el contenido, 
para ello podrás unirte a círculos concretos de tu 
tema favorito y subir tan solo un número limitado de 
publicaciones para que compitan en el ranking global 
o con tus amigos

---

## Setup local

Clonamos los dos repositorios (la API debe estar corriendo en local):

```bash
git clone https://github.com/cromeoli/upp-frontend
git clone https://github.com/cromeoli/upp-API
```

Instalamos las dependencias:

```bash
npm install
```

Y ejecutamos el proyecto

```bash
npm run dev
```

## Despliegue

La API de Upp está desplegada usando Railway en upp-api-production.up.railway.app/api/v1
El frontend está desplegado usando netlify: https://effervescent-swan-27247e.netlify.app/

## Descripción y uso

Actualmente no se puede hacer mucho en lo que está hecho,
tan solo avanzar posts, dejarlos cargar automáticamente o darle "upp",
para ello:

- Saltar post: Doble click/tap
- Pausar cuenta atrás para el cambio automático: Click o tap en el post
- Dar "upp": Pinchar y deslizar hacia arriba

Eventualmente se implementarán las siguientes 
funcionalidades:

- Registro/login
- Subir post
- Mejoras en la visualización y maquetado

