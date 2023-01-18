const fs = require('fs')
const search = require('./file.helper')
const pageList = fs.readdirSync('./pages')
const partialsList = fs.readdirSync('./partials')
/**
 * Alterar idioma a gerar aqui
 */
function upadteLanguage(language) {
    const jsonLocale = require(`./locales/${language}.json`)
    for (const file of pageList) {
        try {
            const inputFileName = file
            const outputFileName = file.split('.')[0]
            search.searchFullReplace(`./pages/${inputFileName}`, jsonLocale, `./page_outputs/${outputFileName}-${language}.hbs`)
        } catch (e) { console.log(e.message) }
    }

    for (const file of partialsList) {
        try {

            const inputFileName = file
            const outputFileName = file.split('.')[0]
            search.searchFullReplace(`./partials/${inputFileName}`, jsonLocale, `./partials_outputs/${outputFileName}-${language}.hbs`)
        } catch (e) { console.log(e.message) }
    }
}

let components = fs.readdirSync('./partials')
const toFixPages = fs.readdirSync("./page_outputs")

function main() {
    const languageCodes = ["ro"]
    for (code of languageCodes) {
        upadteLanguage(code)
    }
}

main()
