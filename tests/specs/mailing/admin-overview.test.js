/* eslint-disable no-undef */
// const env = require('../../utils/env')
authentication = require('../../utils/authentication/admin')
jest.setTimeout(10000)

beforeEach(async () => {
  await authentication(page)

  await page.waitForSelector('a[href="/admin/emails"]')

  await Promise.all([
    page.evaluate(() => document.querySelector('a[href="/admin/emails"]').click()),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ])
})

describe('Test the mailing tab of the administrator interface.', () => {
  test('Presence of the table', async () => {
    await page.waitForSelector('.emails-table')

    const table = await page.$('.emails-table > div > table')
    expect(table).not.toBeNull()
  })
  test('Table not empty', async () => {
    await page.waitForSelector('.emails-table')
    await page.waitForTimeout(2000)

    const lines = await page.$$('.emails-table tbody tr:first-child td')
    expect(lines.length).toBe(5)
  })
  test('Table content', async () => {
    await page.waitForSelector('.emails-table')
    await page.waitForTimeout(2000)

    const code = await page.$('.emails-table tbody tr:first-child td:nth-child(1)')
    expect(await page.evaluate((el) => el.textContent, code)).toMatch(/\d{3}/)

    const date = await page.$('.emails-table tbody tr:first-child td:nth-child(2)')
    expect(await page.evaluate((el) => el.textContent, date)).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2} \(\d{3}\)/)

    const subject = await page.$('.emails-table tbody tr:first-child td:nth-child(3)')
    expect(await page.evaluate((el) => el.textContent, subject)).toMatch(/\w*/)

    const from = await page.$('.emails-table tbody tr:first-child td:nth-child(4)')
    expect(await page.evaluate((el) => el.textContent, from)).toMatch(
      /\w* <(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/
    )
  })
  test('Test popup', async () => {
    await page.waitForSelector('.emails-table')
    await page.waitForTimeout(1000)

    await page.click('.emails-table tbody tr:first-child td:nth-child(1)')

    await page.waitForSelector('.v-dialog.v-dialog--active .dialog-view-email', {
      visible: true,
      timeout: 1000,
    })

    const text = await page.$$('.v-dialog.v-dialog--active .dialog-view-email .v-card__text > *')
    expect(text.length).toBe(9)
    
    const actions = await page.$$('.v-dialog.v-dialog--active .dialog-view-email .v-card__actions > *')
    expect(actions.length).toBe(2)
  })
})
