export default (next, result) => new Promise((resolve, reject) => {
  if (result.isEmpty()) resolve();
  if (!next) {
    reject(result.array().map(i => `${i.msg}`).join('\n'));
  } else {
    reject(result.array().map(i => `${i.msg}`).join('\n'));
  }
});
