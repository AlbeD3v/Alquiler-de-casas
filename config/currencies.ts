// Configuración de monedas
export const currencies = {
  USD: {
    code: "USD",
    name: "Dólar Estadounidense",
    symbol: "$",
    rate: 1,
  },
  CUP: {
    code: "CUP",
    name: "Peso Cubano",
    symbol: "₱",
    rate: 24, // Tasa de cambio aproximada
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    rate: 0.92,
  },
  MLC: {
    code: "MLC",
    name: "Moneda Libremente Convertible",
    symbol: "MLC",
    rate: 1, // 1 MLC = 1 USD
  },
} as const;

export type CurrencyCode = keyof typeof currencies;

// Función para formatear precio
export function formatPrice(
  amount: number,
  currency: CurrencyCode = "USD",
  locale: string = "es-CU"
): string {
  const curr = currencies[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  }).format(amount * curr.rate);
}

// Función para convertir entre monedas
export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  const fromRate = currencies[from].rate;
  const toRate = currencies[to].rate;
  return (amount * fromRate) / toRate;
}
