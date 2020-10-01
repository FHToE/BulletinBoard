  function getExtension(filename: string) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
  
  export function isImage(filename: string) {
    const ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'png':
      case 'jpeg':
        return true;
      default:
    }
    return false;
  }
  