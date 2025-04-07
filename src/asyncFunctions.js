function fetchData(callback) {
  setTimeout(() => {
    callback("dados recebidos");
  }, 1000);
}

function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("dados recebidos");
    }, 1000);
  });
}

module.exports = { fetchData, fetchDataPromise };
