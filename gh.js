console.log("loading gh.js")

gh = {date:Date()}


gh.getCaseFields=async(url="https://raw.githubusercontent.com/globaldothealth/list/main/data-serving/scripts/export-data/case_fields.yaml")=>{
    let txt = await (await fetch(url)).text()
    gh.caseFields={}
    txt.slice(2).split(/\n-\s/).map(x=>x.split(/\s/)).forEach(xi=>{
        gh.caseFields[xi[1]]=xi.slice(3).join(' ').replace('>     ','').replace(' description: ','')
    })
    return gh.caseFields
}

gh.caseFields=(async _=>await gh.getCaseFields())()

if(typeof(define)!='undefined'){
    define(gh)
}