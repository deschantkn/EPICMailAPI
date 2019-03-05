// Parse JSON to object in all cases without throwing
export default (str) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (error) {
    return {};
  }
};
