const CommonUtils = {
  asCurrency: ({
    amount,
    locales = 'en-US',
    opts = {},
  }: {
    amount: number;
    locales?: Intl.LocalesArgument;
    opts?: Intl.NumberFormatOptions;
  }) => {
    return new Intl.NumberFormat(locales, {
      style: 'currency',
      currency: 'USD',
      ...opts,
    }).format(amount);
  },
  numberToMilliseconds: (input: `${number}${'d' | 'h' | 'm'}`) => {
    const unit = input.slice(-1) as 'd' | 'h' | 'm';
    let result = Number(input.slice(0, -1));

    switch (unit) {
      case 'd':
        result = result * 24 * 60 * 60 * 1000;
        break;
      case 'h':
        result = result * 60 * 60 * 1000;
        break;
      case 'm':
        result = result * 60 * 1000;
        break;
    }

    return result;
  },

  getBaseUrl() {
    if (typeof window !== 'undefined') return window.location.origin;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
  },
};

export default CommonUtils;
