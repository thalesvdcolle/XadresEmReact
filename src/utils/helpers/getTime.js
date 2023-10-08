const getCurrentTime = (time) => {
  const minutes = new Date(time).getMinutes();
  const seconds = new Date(time).getSeconds();

  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
};

export { getCurrentTime };
