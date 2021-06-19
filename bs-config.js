const dist = 'out/';

module.exports = {
  ghostMode: {
    clicks: false,
    scroll: false,
    forms: false,
  },
  server: {
    baseDir: dist,
    middleware: [],
  },
};
