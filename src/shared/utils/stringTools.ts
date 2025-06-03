function numberWithCommas(x: string) {
  var parts = x.split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

const brlConverter = (str: string) => {
  return numberWithCommas(str);
};

const dotToComma = (str: string) => {
  return str.replace(".", ",");
};

function generateRandomString({ size = 8, breakLine = 4 }: { size?: number; breakLine?: number }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < size + 1; i++) {
    if (i === breakLine) {
      result += "-";
    } else {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  }

  return result;
}

const stringTools = {
  brlConverter,
  generateRandomString,
  dotToComma,
};
export default stringTools;
