const fs = require("fs")
const search = require("./file.helper")
//TODO: 
/**
 * criar lista de componnets handlebars
 * ler a lista de paginas da pasta output pages
 * percorer lista de paginas e extrair o codigo da lingua
 * ler file da pagina e fazer match do componente e item da lista
 * replace componente por componente+codigo da lingua
 * 
 */
let components = fs.readdirSync('./partials')
const toFixPages = fs.readdirSync("./page_outputs")

async function pageFIx() {
    for (const file of toFixPages) {
        try {
            const languageCode = file.split('.')[0].split("-").at(-1)
            components = components.map((item) => {
                return item.split(".")[0]
            })
            await search.searchRepComponent(`./page_outputs/${file}`, components, languageCode, `./page_outputs/${file}`)
        } catch (e) { console.log(e.message) }
    }

    components = fs.readdirSync('./partials_outputs')
    for (const file of components) {
        try {
            const languageCode = file.split('.')[0].split("-").at(-1)
            const paths = ["/", "map", "event", "resources", "feedback", "communities", "signup"]
            await search.searchRepHrefAtt(`./partials_outputs/${file}`, paths, languageCode, `./partials_outputs/${file}`)
        } catch (e) { console.log(e.message) }
    }
}

function main() {
    pageFIx()
}
main()