
angular.module('lmsApp')

.factory('File', [function () {

  var file,
      storageRef,
      task,
      dl_URL;

  function getFile(aFile) {
    file = aFile;

  }

  function setStorage(path, filename) {
    storageRef = firebase.storage().ref(path + filename);

  }


  function upload() {
    task = storageRef.put(file);
    return task;
  }

  function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    return percentage;
  }

  function getURL() {
    return storageRef.getDownloadURL();
  }

  function getFileDetails(){
    return file;
  }

  return{
    getFileDetails: getFileDetails,
    getFile: getFile,
    setStorage: setStorage,
    upload: upload,
    progress: progress,
    getURL:getURL
    // displayFiles: displayFiles
  }

}]);
