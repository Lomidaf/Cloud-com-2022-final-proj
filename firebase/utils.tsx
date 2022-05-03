export const getRefinedFirebaseAuthErrorMessage = (
  errorMesssage: string
): string => {
  return errorMesssage.replace("Firebase: ", "").replace(/\(auth.*\)\.?/, "");
};
