export const isMobileDevice = () => {
  const userAgent: string = window.navigator.userAgent;
  //Ipad mini/air not detected!
  const mobileRegex =
    /(webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS|Android)/i;
  return mobileRegex.test(userAgent);
};
