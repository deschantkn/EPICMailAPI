// Create a string of random alphanumeric character, of a given length
export default (strLength) => {
  const length = typeof (strLength) === 'number' && strLength > 0 ? strLength : false;
  if (length) {
    // Define all possible characters that could go into a string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    let str = '';
    for (let i = 1; i <= length; i += 1) {
      // Get a random character from the possibleCharacters string
      const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random()
        * possibleCharacters.length));
      // Append this character to the final string
      str += randomCharacter;
    }

    // Return the final string
    return str;
  }
  return false;
};
