const csv = {
  csvToJson(csv: string) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");
    console.log("=========");
    console.log(headers);

    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    // return result; //JavaScript object
    return JSON.stringify(result); //JSON
  },
  arrayToCsv({ toCsv, typeReturn }: { toCsv: object[]; typeReturn?: "string" | "buffer" }): any {
    const keys = Object.keys(toCsv[0]);
    let csv: string | Buffer = "";
    for (let i = 0; i < keys.length; i += 1) {
      csv += `${keys[i]}`;
      if (i === keys.length - 1) {
        csv += `\r\n`;
      } else {
        csv += `|`;
      }
    }
    //
    for (let i = 0; i < toCsv.length; i += 1) {
      const currentValue: any = toCsv[i];
      for (let j = 0; j < keys.length; j += 1) {
        const key = keys[j];
        if (currentValue[keys[j]]) {
          csv += `${currentValue[key]}`;
        }
        if (j === keys.length - 1) {
          csv += `\r\n`;
        } else {
          csv += `|`;
        }
      }
    }
    if (typeReturn === "buffer") {
      csv = Buffer.from(csv, "utf8");
    }
    return csv;
  },
};
export default csv;
