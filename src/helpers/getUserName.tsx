export function getUserName(email: string | undefined) {
  if (email === undefined) {
    return "";
  }
  return email.substring(0, email.indexOf("@"));
}
