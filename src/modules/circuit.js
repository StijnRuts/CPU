const SIMCIR_CLASSNAME = "simcir";

function getSimcirElement(element)
{
  return $(element).find("."+SIMCIR_CLASSNAME);
}

export function getCircuitData(element)
{
  return simcir.controller(
    getSimcirElement(element).find('.simcir-workspace')
  ).text();
}

export function setCircuitData(element, data)
{
  try {
    const parsedData = JSON.parse(data);
    simcir.setupSimcir(getSimcirElement(element), parsedData);
  } catch(error) {
    console.warn("Error while trying to load circuit data", data, error);
    alert("Invalid data\n" + error.message);
  }
}
