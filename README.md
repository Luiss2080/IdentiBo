<div align="center">
  <img src="docs/assets/logo.svg" width="96" alt="Logo de IdentiBo" />
  <h1>🪪 IdentiBo</h1>
  <p><b>Validación de formato de CI y NIT, montos en letras al estilo de facturas bolivianas y formato Bs. Cero dependencias.</b></p>
  <img src="https://img.shields.io/badge/versi%C3%B3n-1.0.0-blue?style=for-the-badge" alt="Versión 1.0.0" />
  <img src="https://img.shields.io/badge/node-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 18+" />
  <img src="https://img.shields.io/badge/dependencias-cero-brightgreen?style=for-the-badge" alt="Cero dependencias" />
  <img src="https://img.shields.io/badge/tests-node%3Atest-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Tests con node:test" />
  <img src="https://img.shields.io/badge/paquete-GitHub%20Packages-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Packages" />
  <img src="https://img.shields.io/badge/licencia-MIT-yellow?style=for-the-badge" alt="Licencia MIT" />
  <img src="https://img.shields.io/github/last-commit/Luiss2080/IdentiBo" alt="Último commit" />
  <img src="https://img.shields.io/badge/PRs-bienvenidos-brightgreen.svg" alt="PRs bienvenidos" />
  <p>
    <a href="#-inicio-rápido">Inicio rápido</a> ·
    <a href="#-características">Características</a> ·
    <a href="#-arquitectura">Arquitectura</a> ·
    <a href="#-pruebas">Pruebas</a> ·
    <a href="#-lo-que-no-hace">Limitaciones</a> ·
    <a href="#-contribuir">Contribuir</a>
  </p>
</div>

Utilidades para formularios y facturación en Bolivia, sin dependencias: valida el formato de CI y NIT, convierte montos a letras como en las facturas bolivianas y da formato a importes en bolivianos. Funciona en Node.js 18 o superior.

## 🎬 Vista rápida

```js
import { validarCI, validarNIT, montoEnLetras, formatoBOB } from '@luiss2080/identibo';

validarCI('1234567-1A SC'); // { valido: true, numero: '1234567', complemento: '1A', expedido: 'SC' }
validarNIT('102.030.405'); // { valido: true, nit: '102030405' }
montoEnLetras(1234.5); // 'Son: Mil doscientos treinta y cuatro 50/100 Bolivianos'
formatoBOB(1234567.891); // 'Bs 1.234.567,89'
```

## ✨ Características

| Característica | Detalle |
|---|---|
| Validación de CI | `validarCI` revisa el formato: 5 a 9 dígitos, con complemento y expedido opcionales. |
| Validación de NIT | `validarNIT` revisa el formato: 7 a 13 dígitos, acepta puntos y guiones. |
| Monto en letras | `montoEnLetras` al estilo de factura ("Son: … 00/100 Bolivianos"); redondea a centavos con enteros, sin errores de coma flotante. |
| Apócopes | Maneja casos como "veintiún mil" y "un millón". |
| Formato Bs. | `formatoBOB` da formato de moneda con punto de miles y coma decimal. |
| Cero dependencias | Un solo módulo ES, sin paquetes externos. |

## 🏗️ Arquitectura

| Archivo | Propósito |
|---|---|
| `index.js` | Módulo ES con las cuatro funciones exportadas. |
| `index.test.js` | Pruebas con `node:test`. |
| `package.json` | Metadatos del paquete y publicación en GitHub Packages. |
| `.github/workflows/` | Flujo de GitHub Actions para probar y publicar. |

## 🚀 Inicio rápido

| Requisito | Versión |
|---|---|
| Node.js | 18+ |

Se publica en GitHub Packages. Agrega a tu `.npmrc`:

```
@luiss2080:registry=https://npm.pkg.github.com
```

Luego instala el paquete:

```bash
npm install @luiss2080/identibo
```

> GitHub Packages pide autenticarse (token con `read:packages`) incluso para paquetes públicos.

## 🧪 Pruebas

```bash
npm test # usa node:test, sin dependencias
```

## 🚧 Lo que no hace

- `validarCI` y `validarNIT` validan **solo el formato**. **No consultan SEGIP ni SIN**.
- El rango del NIT es una aproximación: verifícalo en SIAT para tu caso.
- `montoEnLetras` llega hasta 999.999.999.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Lee la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md) antes de abrir un PR. Para bugs o ideas abre un issue; los problemas de seguridad se reportan según la [política de seguridad](SECURITY.md). ¿Dudas? Mira [SUPPORT.md](SUPPORT.md). Los cambios por versión están en el [CHANGELOG](CHANGELOG.md).

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver [LICENSE](LICENSE).

---

<div align="center">
  <sub>Hecho por <a href="https://github.com/Luiss2080">Luiss2080</a> · utilidades de CI, NIT y facturación para Bolivia</sub>
</div>
