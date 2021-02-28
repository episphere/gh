console.log("loading gh.js")

//https://github.com/globaldothealth

gh = {date:Date()}


gh.getCaseFields=async(url="https://raw.githubusercontent.com/globaldothealth/list/main/data-serving/scripts/export-data/case_fields.yaml")=>{
    let txt = await (await fetch(url)).text()
    gh.caseFields={}
    txt.slice(2).split(/\n-\s/).map(x=>x.split(/\s/)).forEach(xi=>{
        gh.caseFields[xi[1]]=xi.slice(3).join(' ').replace('>     ','').replace(' description: ','')
    })
    return gh.caseFields
}

gh.getCases = async (q='limit=50&page=1',url='https://data.covid-19.global.health/api/cases/')=>{
    //return await (await fetch(`${url}?${q}`))
    return await (await fetch(`${url}?${q}`))
}

gh.getCasesByCountry = async _=>await (await fetch('https://covid-19-aggregates.s3.amazonaws.com/country/latest.json')).json()

gh.caseFields=(async _=>await gh.getCaseFields())()

if(typeof(define)!='undefined'){
    define(gh)
}