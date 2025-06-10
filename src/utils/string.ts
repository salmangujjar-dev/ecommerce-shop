const StringUtils = {
  getInitials: (str?: string) => {
    if (!str?.trim()) {
      return 'NA';
    }
    const splittedStr = str.split(' ');
    return splittedStr[0][0] + (splittedStr?.[1]?.[0] || '');
  },
};

export default StringUtils;
