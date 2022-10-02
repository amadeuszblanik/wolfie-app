const saveFileUtils = (file: File): void => {
  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(file);
  downloadLink.target = "_self";
  downloadLink.download = file.name;
  downloadLink.click();
};

export default saveFileUtils;
