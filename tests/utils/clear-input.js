module.exports = async function(page, input) {
    const input2Clear = await page.$(input);
    await input2Clear.click({ clickCount: 3 })
    await input2Clear.press('Backspace')
}
