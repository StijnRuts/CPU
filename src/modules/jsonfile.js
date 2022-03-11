export function loadFromFile(file)
{
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", (error) => reject(error));
    reader.addEventListener("abort", (error) => reject(error));
    reader.readAsText(file);
  });
}

export function saveToFile(filename, text)
{
  const blob = new Blob([text], {type: "application/json"});
  const objectURL = URL.createObjectURL(blob);

  let a = document.createElement('a');
  a.href = objectURL;
  a.download = filename+".json";
  a.click();

  setTimeout(() => URL.revokeObjectURL(objectURL), 10000);
}
