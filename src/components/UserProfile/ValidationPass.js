export default function ValidationPass(password) {
  const errors = {}

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/.test(
      password.newPassword
    )
  ) {
    errors.newPassword =
      "Password: 6-10 characters, 1 lowercase, 1 uppercase, 1 number, 1 special character."
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/.test(
      password.confirmNewPassword
    )
  ) {
    errors.confirmNewPassword =
      "Password: 6-10 characters, 1 lowercase, 1 uppercase, 1 number, 1 special character."
  }

  if (password.newPassword !== password.confirmNewPassword) {
    errors.confirmNewPassword = "Passwords: Do not match"
  }

  return errors
}
