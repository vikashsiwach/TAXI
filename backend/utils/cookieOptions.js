const userCookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'lax',
}

module.exports = { userCookieOptions }
