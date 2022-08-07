/* eslint-disable no-undef */
const env = require('../../utils/env')
jest.setTimeout(10000)

beforeEach(async () => {
  await page.goto(env.URL + '/admin/login', { waitUntil: 'domcontentloaded' })
})

describe('Test the administrator login portal.', () => {
  test('Good credentials redirects to dashboard', async () => {
    await page.waitForSelector('#login-form')

    await page.type('input#email', env.credentials.admin.email)
    await page.type('input#password', env.credentials.admin.password)

    await Promise.all([page.click('#submit'), page.waitForNavigation({ waitUntil: 'networkidle2' })])

    expect(await page.url()).toBe(env.URL + '/admin/dashboard')
  })
  test('Bad credentials gives error', async () => {
    await page.waitForSelector('#login-form')

    await page.type('input#email', env.credentials.admin.email)
    await page.type('input#password', 'azeazeaze')

    await page.click('#submit')
    await page.waitForSelector('.alert-widget .v-alert', {
      visible: true,
      timeout: 1000,
    })

    expect(await page.$eval('.alert-widget .v-alert', (e) => getComputedStyle(e).display)).toBe('block')

    expect(await page.url()).toBe(env.URL + '/admin/login')
  })
  test('Not admin user gives error', async () => {
    await page.waitForSelector('#login-form')

    await page.type('input#email', env.credentials.user.email)
    await page.type('input#password', env.credentials.user.password)

    await page.click('#submit')
    await page.waitForSelector('.alert-widget .v-alert', {
      visible: true,
      timeout: 1000,
    })

    expect(await page.$eval('.alert-widget .v-alert', (e) => getComputedStyle(e).display)).toBe('block')

    expect(await page.url()).toBe(env.URL + '/admin/login')
  })
  test('Reconnect after disconnect', async () => {
    await page.waitForSelector('#login-form')

    await page.type('input#email', env.credentials.admin.email)
    await page.type('input#password', env.credentials.admin.password)

    await Promise.all([page.click('#submit'), page.waitForNavigation({ waitUntil: 'networkidle2' })])

    expect(await page.url()).toBe(env.URL + '/admin/dashboard')

    await page.waitForSelector('a[href="/admin/login"]')
    await Promise.all([
      page.evaluate(() => document.querySelector('a[href="/admin/login"]').click()),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ])
    expect(await page.url()).toBe(env.URL + '/admin/login')

    await page.waitForSelector('#login-form')

    await page.type('input#email', env.credentials.admin.email)
    await page.type('input#password', env.credentials.admin.password)

    await Promise.all([page.click('#submit'), page.waitForNavigation({ waitUntil: 'networkidle2' })])

    expect(await page.url()).toBe(env.URL + '/admin/dashboard')
  })
})
