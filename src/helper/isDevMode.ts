const isDevMode = () => {
  return process.env.IS_DEV === "true";
};

export default isDevMode;
