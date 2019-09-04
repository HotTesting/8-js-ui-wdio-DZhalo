const assert = require('assert');

describe("Contact us form", function() {
    it("must send messages to shop administration", function() {
        browser.url('')
        const headerMenu = $('div[id="default-menu"]')
        const customerServiceButton = headerMenu.$('.customer-service')
        customerServiceButton.click()
        
        const contactUsForm = $('form[name="contact_form"]')
        const nameInput = contactUsForm.$('input[name="name"]')
        nameInput.setValue("Test")
        const emailInput = contactUsForm.$('input[name="email"]')
        emailInput.setValue("test@test.com")
        const subjectInput = contactUsForm.$('input[name="subject"]')
        subjectInput.setValue("Question")
        const messageTextArea = contactUsForm.$('textarea[name="message"]')
        messageTextArea.setValue("How u doin'?")
        const sendButton = contactUsForm.$('button[name="send"]')
        sendButton.click()
        browser.pause(3000)


        const successMessage = $('#notices .alert-success')
        assert(successMessage.isDisplayed(), 'Send form success message should be visible')

        const text = successMessage.getText()
        assert(text.includes('Your email has successfully been sent'), 'Success message is invalid')

    })
  })

