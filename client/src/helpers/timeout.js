function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Wishlist API timeout"));
    }, ms);

    promise
      .then((value) => {
        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      })
      .finally(() => clearTimeout(timer));
  });
}

export default timeout;
