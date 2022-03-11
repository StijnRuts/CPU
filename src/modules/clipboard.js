export function getClipboardText()
{
  return navigator.clipboard.readText();
}

export function setClipboardText(text)
{
  navigator.clipboard.writeText(text);
}
