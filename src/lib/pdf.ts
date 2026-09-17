export function generatePDF(filename: string) {
  // Set the document title so it becomes the default save filename
  const previousTitle = document.title;
  document.title = filename.replace(".pdf", "");

  window.print();

  // Restore title after print dialog is closed
  setTimeout(() => {
    document.title = previousTitle;
  }, 1000);
}
