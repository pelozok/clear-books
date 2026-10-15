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
  (`users/{uid}/config/profile`). Lee y escribe todo el hogar sin estar en la allowlist.
  Para que la app la lleve al hogar, su propio perfil (`users/{suUid}/config/profile`)
  necesita `partnerOf: uidDelDueño`, y para escribir ese perfil propio sí debe estar en la allowlist.
- Si se usa un dominio nuevo para la app, agregarlo en Firebase Console → Authentication →
  Settings → Authorized domains.
