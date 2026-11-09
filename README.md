# IdentiBo

Utilidades para formularios y facturación en Bolivia, sin dependencias.

```js
import { validarCI, validarNIT, montoEnLetras, formatoBOB } from '@luiss2080/identibo';

validarCI('1234567-1A SC');   // { valido: true, numero: '1234567', complemento: '1A', expedido: 'SC' }
validarNIT('102.030.405');    // { valido: true, nit: '102030405' }
montoEnLetras(1234.5);        // 'Son: Mil doscientos treinta y cuatro 50/100 Bolivianos'
formatoBOB(1234567.891);      // 'Bs 1.234.567,89'
```

## Importante

- `validarCI` y `validarNIT` validan **solo el formato** (CI: 5–9 dígitos + complemento y expedido opcionales; NIT: 7–13 dígitos). **No consultan SEGIP ni SIN**; el rango del NIT es una aproximación, verifícalo en SIAT para tu caso.
- `montoEnLetras` redondea a centavos con enteros (sin errores de coma flotante) y maneja apócopes ("veintiún mil", "un millón"). Rango: hasta 999.999.999.

## Instalación

Se publica en GitHub Packages. Agrega a tu `.npmrc`:

```
@luiss2080:registry=https://npm.pkg.github.com
```

```bash
npm install @luiss2080/identibo
```

> GitHub Packages pide autenticarse (token con `read:packages`) incluso para paquetes públicos.

## Desarrollo

```bash
npm test   # usa node:test, sin dependencias
```

Licencia MIT.
