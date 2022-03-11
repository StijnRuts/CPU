const BUTTON_CLASS = "btn";

function buttonElement(className, text, onClick)
{
  const button = document.createElement("button");
  button.classList.add(className);
  button.innerHTML = text;
  button.addEventListener("click", onClick);

  return button;
};

function defaultButton(className, text, onClick)
{
  const button = buttonElement(className, text, onClick);
  button.classList.add(BUTTON_CLASS);

  return button;
};

function loadFileButton(className, text, onLoad)
{
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", ".json");
  input.setAttribute("style", "display:none");
  input.addEventListener("change", (event) => {
    if (event.target.files.length > 0) {
      onLoad(event);
    }
  });

  const button = buttonElement(className, text, () => input.click())

  const span = document.createElement("span");
  span.classList.add(BUTTON_CLASS);
  span.appendChild(button);
  span.appendChild(input);

  return span;
}

function saveDialog(onSave)
{
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("required", "");

  const label = document.createElement("label");
  label.appendChild(document.createTextNode("Filename: "));
  label.appendChild(input);

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("type", "button");
  cancelButton.appendChild(document.createTextNode("Cancel"));

  const saveButton = document.createElement("button");
  saveButton.setAttribute("type", "submit");
  saveButton.appendChild(document.createTextNode("Save"));

  const menu = document.createElement("menu");
  menu.appendChild(cancelButton);
  menu.appendChild(saveButton);

  let form = document.createElement("form");
  form.setAttribute("method", "dialog");
  form.appendChild(label);
  form.appendChild(menu);

  let dialog = document.createElement("dialog");
  dialog.appendChild(form);

  cancelButton.addEventListener("click", () => {
    dialog.returnValue = "cancel";
    dialog.close();
  });

  dialog.addEventListener("cancel", () => {
    dialog.returnValue = "cancel";
  });

  saveButton.addEventListener("click", () => {
    dialog.returnValue = "save";
  });

  dialog.addEventListener('close', (event) => {
    if (dialog.returnValue === 'save') {
      event.filename = input.value;
      onSave(event);
    }
  });

  return dialog;
}

function saveFileButton(className, text, onSave)
{
  const dialog = saveDialog((event) => {
    onSave(event);
  });

  const button = buttonElement(className, text, (event) => dialog.showModal());

  const span = document.createElement("span");
  span.classList.add(BUTTON_CLASS);
  span.appendChild(button);
  span.appendChild(dialog);

  return span;
}

export function editorControls(onCopy, onPaste, onSave, onLoad)
{
  const controls = document.createElement("menu");
  controls.setAttribute("class", "controls");
  controls.appendChild(defaultButton("copy", "&#128203; Copy &#11015;", onCopy));
  controls.appendChild(defaultButton("paste", "&#128203; Paste &#11014;", onPaste));
  controls.appendChild(saveFileButton("save", "&#128190; Save &#11015;", onSave));
  controls.appendChild(loadFileButton("load", "&#128190; Load &#11014;", onLoad));

  return controls;
}
