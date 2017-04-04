import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';  // eslint-disable-line

fs.readFile('tools/index.template.html', (err, markup) => {
  process.stdout.write('\n');
  if (err) return process.stdout.write(`❌  fs.readFile ERROR: ${err}`);

  const $ = cheerio.load(markup);

  if (process.env.NODE_ENV === 'development') {
    $('body')
    .append('<script src="/bundle.js" />')
    .append('<script src="/bundle.app.js" />')
    .append('<script src="/bundle.vendor.js" />');
    fs.writeFile('src/index.html', $.html(), 'utf8', (error) => {
      process.stdout.write('\n');
      if (error) return process.stdout.write(`❌  fs.readFile ERROR: ${error}`.red.bold);
      return process.stdout.write('\n ✅  index.html written to "/src"\n'.green.bold);
    });
  } else {
    $('#app').append('<script src="/commons.js" />');
    fs.writeFile('dist/index.html', $.html(), 'utf8', (error) => {
      process.stdout.write('\n');
      if (error) return process.stdout.write(`❌  fs.readFile ERROR: ${error}`.red.bold);
      return process.stdout.write('\n ✅  index.html written to "/dist"\n'.green.bold);
    });
  }
  return 1;
});
