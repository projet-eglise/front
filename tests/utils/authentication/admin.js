/* eslint-disable no-undef */
const env = require('../../utils/env')
clearInput = require('../../utils/clear-input')

module.exports = async function (page) {
  await page.goto(env.URL + '/admin/login', { waitUntil: 'domcontentloaded' })

  await page.waitForSelector('#login-form')

  await clearInput(page, 'input#email')
  await clearInput(page, 'input#password')

  await page.type('input#email', env.credentials.admin.email)
  await page.type('input#password', env.credentials.admin.password)

  await Promise.all([page.click('#submit'), page.waitForNavigation({ waitUntil: 'networkidle2' })])
}
