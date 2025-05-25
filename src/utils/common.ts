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
};

export default CommonUtils;
