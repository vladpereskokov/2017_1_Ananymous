const pathToRegex = (pathname => {
  const keyNames = [];
  const parts = pathname
    .split('/')
    .filter(part => part)
    .map(part => {
      if (/^:/.exec(part)) {
        keyNames.push(part.slice(1));
        return new RegExp(`^\/([^/]+)`, `i`);
      }
      return new RegExp(`^\/${part}`, `i`);
    });

  return path => {
    const keys = [];
    const check = parts.every(regexp => {
      const tmp = regexp.exec(path);

      if (!tmp) {
        return false;
      }

      if (tmp.length === 2) {
        keys.push(tmp[1]);
      }

      path = path.replace(regexp, '');

      return true;
    });

    if (check) {
      return keys.reduce((prev, curr, pos) => {
        prev[keyNames[pos]] = curr;
        return prev;
      }, {});
    }

    return null;
  };
});

export default pathToRegex;
