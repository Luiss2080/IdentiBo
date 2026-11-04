// Utilidades para formularios y facturación en Bolivia. Sin dependencias.
// IMPORTANTE: las validaciones de CI y NIT son de FORMATO; no consultan SEGIP ni SIN.

const EXPEDIDO = ['CH', 'LP', 'CB', 'OR', 'PT', 'TJ', 'SC', 'BE', 'PA'];
const RE_CI = new RegExp(`^(\\d{5,9})(?:[-\\s]?(\\d[A-Z]))?(?:[-\\s]?(${EXPEDIDO.join('|')}))?$`);

/** Valida el formato de un CI: 5–9 dígitos, complemento opcional (ej. 1A) y expedido opcional (ej. LP). */
export function validarCI(valor) {
  const limpio = String(valor ?? '').trim().toUpperCase();
  const m = RE_CI.exec(limpio);
  if (!m) return { valido: false };
  return { valido: true, numero: m[1], complemento: m[2] ?? null, expedido: m[3] ?? null };
}

/** Valida el formato de un NIT (solo dígitos, 7 a 13). No verifica existencia ante el SIN. */
export function validarNIT(valor) {
  const limpio = String(valor ?? '').replace(/[\s.-]/g, '');
  return { valido: /^\d{7,13}$/.test(limpio), nit: /^\d{7,13}$/.test(limpio) ? limpio : null };
}

const UNIDADES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
const DECENAS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

const apocope = (s) => s.replace(/veintiuno$/, 'veintiún').replace(/uno$/, 'un');

function menorMil(n) {
  if (n === 100) return 'cien';
  const c = Math.floor(n / 100);
  const r = n % 100;
  const partes = [CENTENAS[c]];
  if (r > 0 && r < 30) partes.push(UNIDADES[r]);
  else if (r >= 30) {
    const u = r % 10;
    partes.push(DECENAS[Math.floor(r / 10)] + (u ? ` y ${UNIDADES[u]}` : ''));
  }
  return partes.filter(Boolean).join(' ');
}

/** Entero (0 – 999.999.999) a letras en español. */
export function numeroALetras(n) {
  if (!Number.isInteger(n) || n < 0 || n > 999_999_999) throw new RangeError('Se admite un entero entre 0 y 999.999.999');
  if (n === 0) return 'cero';
  const millones = Math.floor(n / 1_000_000);
  const miles = Math.floor((n % 1_000_000) / 1000);
  const resto = n % 1000;
  const partes = [];
  if (millones) partes.push(millones === 1 ? 'un millón' : `${apocope(menorMilYMas(millones))} millones`);
  if (miles) partes.push(miles === 1 ? 'mil' : `${apocope(menorMil(miles))} mil`);
  if (resto) partes.push(menorMil(resto));
  return partes.join(' ');
}
const menorMilYMas = (n) => {
  const miles = Math.floor(n / 1000);
  return miles ? `${apocope(menorMil(miles))} mil ${n % 1000 ? menorMil(n % 1000) : ''}`.trim() : menorMil(n);
};

/** Monto en el formato de facturas bolivianas: "Son: Ciento veinte 50/100 Bolivianos". */
export function montoEnLetras(monto, { moneda = 'Bolivianos' } = {}) {
  if (typeof monto !== 'number' || !Number.isFinite(monto) || monto < 0) throw new TypeError('monto debe ser un número >= 0');
  const centavos = Math.round(monto * 100);
  const entero = Math.floor(centavos / 100);
  const letras = numeroALetras(entero);
  return `Son: ${letras[0].toUpperCase()}${letras.slice(1)} ${String(centavos % 100).padStart(2, '0')}/100 ${moneda}`;
}

/** 1234.5 -> "Bs 1.234,50" */
export function formatoBOB(monto) {
  if (typeof monto !== 'number' || !Number.isFinite(monto)) throw new TypeError('monto debe ser un número');
  const negativo = monto < 0;
  const centavos = Math.round(Math.abs(monto) * 100);
  const entero = String(Math.floor(centavos / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${negativo ? '-' : ''}Bs ${entero},${String(centavos % 100).padStart(2, '0')}`;
}
