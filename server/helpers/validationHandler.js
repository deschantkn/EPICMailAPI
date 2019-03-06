export default (next, result) => new Promise((resolve, reject) => {
  if (result.isEmpty()) resolve();
  if (!next) {
    reject(new Error(result.array().map(i => `${i.param}: ${i.msg}`).join('\n')));
  } else {
    reject(new Error(result.array().map(i => `${i.param}: ${i.msg}`).join('\n')));
  }
});
