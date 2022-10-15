export const getExtensionWithoutDot = (fileName: string) => {
  const ext = fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
  return ext.trim().toLowerCase();
};