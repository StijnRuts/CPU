import { editorControls } from './controls.js';
import { getCircuitData, setCircuitData } from './circuit.js';
import { getClipboardText, setClipboardText } from './clipboard.js';
import { loadFromFile, saveToFile } from './jsonfile.js';

const EDITOR_CLASSNAME = "editor";

export function init()
{
  for (let editor of getEditors()) {
    editor.appendChild(editorControls(copy, paste, save, load));
  }
}

function getEditors() 
{
  return document.getElementsByClassName(EDITOR_CLASSNAME);
}

function getEditor(element) 
{
  return element.closest("."+EDITOR_CLASSNAME);
}

function copy(event)
{
  const editor = getEditor(event.target);
  setClipboardText(
    getCircuitData(editor)
  );
}

function paste(event)
{
  const editor = getEditor(event.target);
  getClipboardText()
    .then(data => setCircuitData(editor, data));
}

function save(event)
{
  const editor = getEditor(event.target);
  saveToFile(
    event.filename,
    getCircuitData(editor)
  );
}

function load(event)
{
  const editor = getEditor(event.target);
  loadFromFile(event.target.files[0])
    .then(data => setCircuitData(editor, data));
}
