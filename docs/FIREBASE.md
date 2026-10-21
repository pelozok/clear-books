# Firebase: reglas de Firestore

Proyecto: `clear-books-56595`. Las reglas viven en `firestore.rules` (versionadas en el repo);
`firebase.json` y `.firebaserc` ya apuntan a ese archivo y a ese proyecto.

## Desplegar las reglas

Usar la cuenta personal **kevindp2008@gmail.com** (no la del trabajo).

```bash
npx firebase-tools login            # elegir kevindp2008@gmail.com
npx firebase-tools login:list       # confirmar la cuenta activa
npx firebase-tools deploy --only firestore:rules
```

Si había otra cuenta logueada: `npx firebase-tools logout` y volver a `login`.

## Dar acceso a un correo nuevo

1. En `firestore.rules`, función `isAllowed()`, agregar el correo a la lista:
   ```
   request.auth.token.email in ['kevindp2008@gmail.com', 'nuevo@gmail.com']
   ```
2. Desplegar (`npx firebase-tools deploy --only firestore:rules`) y hacer commit.

## Cómo funciona el acceso

- **Dueño**: `request.auth.uid == uid` y su correo está en la allowlist.
- **Pareja**: su correo coincide con `partnerEmail` del perfil del hogar
  (`users/{uid}/config/profile`). Lee y escribe todo el hogar sin estar en la allowlist,
  salvo el perfil: lo puede actualizar pero no cambiar `partnerEmail` ni `partnerOf`, ni borrarlo.
  Solo el dueño decide con quién se comparte y puede borrar el hogar.
  Para que la app la lleve al hogar, su propio perfil (`users/{suUid}/config/profile`)
  necesita `partnerOf: uidDelDueño`, y para escribir ese perfil propio sí debe estar en la allowlist.
- Si se usa un dominio nuevo para la app, agregarlo en Firebase Console → Authentication →
  Settings → Authorized domains.

## Protecciones de la consola (se configuran a mano)

### Restringir la API key del navegador

La API key va en el bundle público; lo que protege los datos son las reglas. Restringirla
por dominio evita que se use desde otros sitios.

Google Cloud Console (proyecto `clear-books-56595`) → APIs y servicios → Credenciales →
la clave "Browser key (auto created by Firebase)" → Restricciones de aplicaciones →
Sitios web, y agregar:

```
https://pelozok.github.io/*
https://clear-books-56595.firebaseapp.com/*
http://localhost/*
http://127.0.0.1/*
```

`firebaseapp.com` es obligatorio: ahí vive la ventana del login con Google.

### App Check (reCAPTCHA v3)

1. Crear una clave reCAPTCHA v3 en https://www.google.com/recaptcha/admin con los dominios
   `pelozok.github.io` y `localhost`.
2. Firebase Console → App Check → registrar la app web con esa clave (pide la secret key).
3. Poner la site key en `.env.local` como `VITE_RECAPTCHA_SITE_KEY` y desplegar
   (`npm run deploy`). Sin esa variable la app no inicializa App Check.
4. Dejar unos días en modo monitoreo (App Check → APIs → Cloud Firestore) y, si las
   solicitudes verificadas están cerca del 100%, **Aplicar** (enforce) para Firestore.
