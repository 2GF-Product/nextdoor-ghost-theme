const fs = require('fs');

const searchFullReplace = async (filename, jsonReplaceList, destFileName) => {
    return new Promise((resolve) => {
        let resultFile

        fs.readFile(filename, 'utf-8', function (err, contents) {
            if (err) {
                console.log(err);
                throw err;
            }

            resultFile = contents
            Object.keys(jsonReplaceList).forEach(element => {

                const regEx = new RegExp(`{{t.*["|']${element}.*["|']}}`, "gm")
                resultFile = resultFile.replace(regEx, `{{t "${jsonReplaceList[element]}"}}`)
            })

            fs.writeFile(destFileName, resultFile, 'utf-8', function (err, data) {
                if (err) throw err
                console.log("Done replacing", filename)
                resolve(data)
            })
        })
    })
}

const searchRepComponent = async (filename, replaceList, languageCode, destFileName) => {
    return new Promise((resolve) => {
        let resultFile

        fs.readFile(filename, 'utf-8', async function (err, contents) {
            if (err) {
                console.log(err);
                throw err;
            }

            resultFile = contents
            await replaceList.forEach(element => {
                const regEx = new RegExp(`{{> ${element}}}`, "gm")
                resultFile = resultFile.replace(regEx, `{{> ${element}-${languageCode}}}`)
            })


            const regEx = new RegExp(`{{!< default`, "gm")
            resultFile = await resultFile.replace(regEx, `{{!< default-${languageCode}`)

            const regEx2 = new RegExp(`<html lang=".*">`, "gm")
            resultFile = await resultFile.replace(regEx2, `<html lang="${languageCode}">`)

            const regEx3 = new RegExp(`{{> header}}`, "gm")
            resultFile = await resultFile.replace(regEx3, `{{> header-${languageCode}}}`)

            const regEx4 = new RegExp(`{{> footer}}`, "gm")
            resultFile = await resultFile.replace(regEx4, `{{> footer-${languageCode}}}`)


            fs.writeFile(destFileName, resultFile, 'utf-8', function (err, data) {
                if (err) throw err
                console.log("Done replacing", filename)
                resolve(data)
            })
        })
    })
}


const searchRepHrefAtt = async (filename, replaceList, languageCode, destFileName) => {
    return new Promise((resolve) => {
        let resultFile

        fs.readFile(filename, 'utf-8', async function (err, contents) {
            if (err) {
                console.log(err);
                throw err;
            }

            resultFile = contents
            replaceList.forEach(element => {
                const regEx = new RegExp(`href="\/${element}\/"`, "gm")
                resultFile = resultFile.replace(regEx, `href="\/${languageCode}/${element}/"`)
            })

            const regEx = new RegExp(`src="assets`, "gm")
            resultFile = await resultFile.replace(regEx, `src="../assets`)

            const regEx2 = new RegExp(`href="{{@site\.url}}"`, "gm")
            resultFile = resultFile.replace(regEx2, `href="{{@site\.url}}/${languageCode}"`)

            fs.writeFile(destFileName, resultFile, 'utf-8', function (err, data) {
                if (err) throw err
                console.log("Done replacing", filename)
                resolve(data)
            })
        })
    })
}

module.exports = { searchFullReplace, searchRepComponent, searchRepHrefAtt }