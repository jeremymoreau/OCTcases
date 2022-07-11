
/* eslint-disable */
const fs = require('fs')
const path = require('path')
const orderBy = require('natural-orderby')
/* eslint-enable */


module.exports = function generateIndex(ctx) {
    // Generate and Index JSON file of all the cases in /public/content/cases
    const caseIndex = []
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
            caseIndex.push(currentCase)
        }
    })

    const sortedCaseIndex = orderBy.orderBy(
        caseIndex,
        [v => v.caseID],
        ['asc']
    )

    const indexFilePath = './public/assets/index/case_index.json'
    fs.writeFileSync(indexFilePath, JSON.stringify(sortedCaseIndex));

    // Generate and Index JSON file of all the articles in /public/content/articles
    const articleIndex = []
    fs.readdirSync("./public/content/articles").forEach((file) => {
        if (file.endsWith('json')) {
            const filePath = path.join('./public/content/articles/', file)
            const jsonData = JSON.parse(fs.readFileSync(filePath))
            
            const currentArticle = {
                "slug": file.slice(0, -5), // remove .json from string
                "title": jsonData.title,
                "description": jsonData.description,
                "sortOrder": jsonData.sortOrder
            }
            articleIndex.push(currentArticle)
        }
    })
    
    const sortedArticleIndex = orderBy.orderBy(
        articleIndex,
        [v => v.sortOrder],
        ['asc']
    )

    const articleIndexFilePath = './public/assets/index/article_index.json'
    fs.writeFileSync(articleIndexFilePath, JSON.stringify(sortedArticleIndex));

    // Generate and Index JSON file of all the atlas in /public/content/atlas
    const atlasIndex = []
    fs.readdirSync("./public/content/atlas").forEach((file) => {
        if (file.endsWith('json')) {
            const filePath = path.join('./public/content/atlas/', file)
            const jsonData = JSON.parse(fs.readFileSync(filePath))
            
            const currentAtlas = {
                "slug": file.slice(0, -5), // remove .json from string
                "title": jsonData.title,
                "description": jsonData.description,
                "mainImage": jsonData.mainImage
            }
            atlasIndex.push(currentAtlas)
        }
    })

    const sortedAtlasIndex = orderBy.orderBy(
        atlasIndex,
        [v => v.title],
        ['asc']
    )

    const atlasIndexFilePath = './public/assets/index/atlas_index.json'
    fs.writeFileSync(atlasIndexFilePath, JSON.stringify(sortedAtlasIndex));
}