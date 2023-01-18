const fs = require('fs');

const pageFileNameList = [
    "index",
    "event-page",
    "communities-page",
    "map-page",
    "event-detail-page",
    "organisation-detail-page",
    "feedback-page",
    "sign-up",
]

const flagsCodeList = [
    "pt",
    "ro",
    "fr",
    "it",
    "es",
    "de"
]

function generateFIleCopies(nameList, inputFoldet, outputFolder) {
    for (nameItem of nameList) {
        flagsCodeList.forEach((flagCode) => {
            const sourceFile = `./${inputFoldet}/${nameItem}.hbs`;
            const destFile = `${outputFolder}/${nameItem}-${flagCode}.hbs`
            copyThisFile(sourceFile, destFile)
            // resultFileNameList.push(
            //     `${nameItem}-${flagCode}.hbs`
            // )
        })
    }
}

function copyThisFile(file, destName) {
    fs.copyFile(file, destName, (err) => {
        if (err) throw err;
        console.log(`Copied ${file} to ${destName}`)
    })
}

function main() {
    // createCopy(fileNameList)
    // copyThisFile("./index.hbs", "./copythat.hbs")
    // generateFIleCopies(pageFileNameList)
    let partialsFileNameList = fs.readdirSync("./../partials/")
    partialsFileNameList = partialsFileNameList.map((item) => {
        return item.split('.')[0]
    })
    console.log(partialsFileNameList)
    generateFIleCopies(partialsFileNameList, "./../partials", "./partials")
}

main()