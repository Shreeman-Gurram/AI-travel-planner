export const loginUser = (credentials) =>
  Promise.resolve({
    success: true,
    user: {
      name: credentials.email.split('@')[0],
      email: credentials.email,
    },
  })

export const signupUser = (data) =>
  Promise.resolve({
    success: true,
    user: {
      name: data.name,
      email: data.email,
    },
  })
