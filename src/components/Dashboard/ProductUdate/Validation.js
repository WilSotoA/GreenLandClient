export default function Validation(formData) {
  const errors = {}

  if (!/^[A-Za-z\s]+$/.test(formData.name) || formData.name.trim() === "") {
    errors.name = "You must enter a valid name"
  }

  if (formData.name.length > 90) {
    errors.name = "You cannot exceed 90 characters"
  }
  
  if (formData.price <= 0) {
    errors.price = "invalid price value"
  }
  if (formData.stock <= 0) {
    errors.stock = "invalid stock value"
  }
  
  if (formData.description.length > 400) {
    errors.description = "You cannot exceed 400 characters"
  }
  if (formData.description.length < 10) {
    errors.description = "minimum 10 characters in the description"
  }
  // if (!/^\d+$/.test(formData.phone_number)) {
  //   errors.phone_number = "Please enter a phone number"
  // }

  // if (formData.country === "None") {
  //   errors.country = "You must select a country"
  // }

  // if (formData.address.length > 90) {
  //   errors.address = "You cannot exceed 90 characters"
  // }

  // if (formData.address.length === 0) {
  //   errors.address = "You must enter a valid address"
  // }

  // if (formData.birth_date) {
  //   let hoy = new Date()
  //   let cumpleanos = new Date(formData.birth_date)
  //   let edad = hoy.getFullYear() - cumpleanos.getFullYear()
  //   let m = hoy.getMonth() - cumpleanos.getMonth()
  //   if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
  //     edad--
  //   }
  //   if (edad < 18) {
  //     errors.birth_date = "You must be at least 18 years old"
  //   }
  //   if (edad > 90) {
  //     errors.birth_date = "You cannot be older than 90 years"
  //   }
  // }

  return errors
}
