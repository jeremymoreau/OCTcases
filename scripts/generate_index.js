
/* eslint-disable */
const fs = require('fs')
const path = require('path')
/* eslint-enable */


module.exports = function generateIndex(ctx) {
    // Generate and Index JSON file of all the cases in /public/content/cases
    const caseIndex = {}
    let i = 0
    fs.readdirSync("./public/content/cases").forEach((file) => {
        if (file.endsWith('json')) {
            const filePath = path.join('./public/content/cases/', file)
            const jsonData = JSON.parse(fs.readFileSync(filePath))
            
            const currentCase = {
                "caseID": jsonData.caseID,
                "category": jsonData.category,
                "title": jsonData.title,
                "description": jsonData.description
            }
            caseIndex[i] = currentCase
            i++
        }
    })

    const indexFilePath = './public/assets/index/case_index.json'
    fs.writeFileSync(indexFilePath, JSON.stringify(caseIndex));

    // Generate and Index JSON file of all the articles in /public/content/articles
    const articleIndex = {}
    let j = 0
    fs.readdirSync("./public/content/articles").forEach((file) => {
        if (file.endsWith('json')) {
            const filePath = path.join('./public/content/articles/', file)
            const jsonData = JSON.parse(fs.readFileSync(filePath))
            
            const currentArticle = {
                "slug": file,
                "title": jsonData.title,
                "description": jsonData.description
            }
            articleIndex[j] = currentArticle
            j++
        }
    })

    const articleIndexFilePath = './public/assets/index/article_index.json'
    fs.writeFileSync(articleIndexFilePath, JSON.stringify(articleIndex));
}