import {getSizeMetrics} from './getSizeMetrics.mjs';

let SIZE_INCREASE_THRESHOLD = Number(process.env.SIZE_INCREASE_THRESHOLD || 10);
if (isNaN(SIZE_INCREASE_THRESHOLD)) SIZE_INCREASE_THRESHOLD = 10;

function checkChangeBetween(current, latest) {
  if (latest == null || current == null) return;
  const change = latest - current;
  const percentage = ((change / current) * 100).toFixed(2);
  const increased = change > 0;
  const variation = Math.abs(percentage);
  return {
    change,
    increased,
    percentage,
    alert: variation > SIZE_INCREASE_THRESHOLD,
    report: `${variation} bytes (${change > 0 ? '▲' : '▼'}${percentage}%)`,
  };
}

export function validateSizeIncrease(pkg) {
  const metrics = getSizeMetrics(pkg);
  const checks = [];
  pkg.submodules.forEach((definition) => {
    const data = metrics[definition.submodule];
    const check = {submodule: definition.submodule};
    const [current, latest] = data.mjs.slice(-2);
    if (latest == null || current == null) return;

    check.commit = `${current.commit}..${latest.commit}`;

    // mjs
    const mjsMinified = checkChangeBetween.apply(
      {},
      data.mjs.slice(-2).map(({minified}) => minified),
    );
    if (!mjsMinified) return;
    check[`mjs (minified)`] = mjsMinified.report;
    const mjsGzip = checkChangeBetween.apply(
      {},
      data.mjs.slice(-2).map(({gzip}) => gzip),
    );
    check[`mjs (gzip)`] = mjsGzip.report;

    // cjs
    const cjsMinified = checkChangeBetween.apply(
      {},
      data.cjs.slice(-2).map(({minified}) => minified),
    );
    if (!cjsMinified) return;
    check[`cjs (minified)`] = cjsMinified.report;
    const cjsGzip = checkChangeBetween.apply(
      {},
      data.cjs.slice(-2).map(({gzip}) => gzip),
    );
    if (!cjsGzip) return;
    check[`cjs (gzip)`] = cjsGzip.report;

    check.alert =
      mjsGzip.alert || mjsMinified.alert || cjsGzip.alert || cjsMinified.alert;

    checks.push(check);
  });

  return checks;
}
