import test from 'node:test';
import assert from 'node:assert/strict';
import { validarCI, validarNIT, numeroALetras, montoEnLetras, formatoBOB } from './index.js';

test('CI: formatos válidos', () => {
  assert.deepEqual(validarCI('1234567'), { valido: true, numero: '1234567', complemento: null, expedido: null });
  assert.deepEqual(validarCI('1234567-1a sc'), { valido: true, numero: '1234567', complemento: '1A', expedido: 'SC' });
  assert.equal(validarCI(' 7654321 LP ').expedido, 'LP');
});

test('CI: formatos inválidos', () => {
  for (const v of ['', '12', 'abc', '1234567-XX', '12345678901', null, undefined]) assert.equal(validarCI(v).valido, false, String(v));
});

test('NIT: solo dígitos 7-13, tolera separadores', () => {
  assert.equal(validarNIT('1020304050').valido, true);
  assert.equal(validarNIT('102.030.405').nit, '102030405');
  assert.equal(validarNIT('12345').valido, false);
  assert.equal(validarNIT('10203A').valido, false);
});

test('numeroALetras: casos de borde del español', () => {
  const casos = {
    0: 'cero', 1: 'uno', 15: 'quince', 21: 'veintiuno', 30: 'treinta', 31: 'treinta y uno',
    100: 'cien', 101: 'ciento uno', 999: 'novecientos noventa y nueve', 1000: 'mil',
    1001: 'mil uno', 2000: 'dos mil', 21000: 'veintiún mil', 31000: 'treinta y un mil',
    100000: 'cien mil', 1000000: 'un millón', 2000000: 'dos millones',
    1234567: 'un millón doscientos treinta y cuatro mil quinientos sesenta y siete',
    21000000: 'veintiún millones',
  };
  for (const [n, esperado] of Object.entries(casos)) assert.equal(numeroALetras(Number(n)), esperado, n);
});

test('numeroALetras: rechaza fuera de rango', () => {
  assert.throws(() => numeroALetras(-1), RangeError);
  assert.throws(() => numeroALetras(1.5), RangeError);
  assert.throws(() => numeroALetras(1e9), RangeError);
});

test('montoEnLetras: formato de factura y redondeo a centavos', () => {
  assert.equal(montoEnLetras(120.5), 'Son: Ciento veinte 50/100 Bolivianos');
  assert.equal(montoEnLetras(1), 'Son: Uno 00/100 Bolivianos');
  assert.equal(montoEnLetras(0.1 + 0.2), 'Son: Cero 30/100 Bolivianos');
  assert.equal(montoEnLetras(19.999), 'Son: Veinte 00/100 Bolivianos');
  assert.throws(() => montoEnLetras(-5), TypeError);
});

test('formatoBOB', () => {
  assert.equal(formatoBOB(1234.5), 'Bs 1.234,50');
  assert.equal(formatoBOB(0), 'Bs 0,00');
  assert.equal(formatoBOB(1234567.891), 'Bs 1.234.567,89');
  assert.equal(formatoBOB(-5), '-Bs 5,00');
});
