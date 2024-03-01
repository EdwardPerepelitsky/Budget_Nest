const urlBase = 'http://localhost:3000/'

export async function callBackend(url,method,params,body){


    const urlFull = urlBase + url

    let globalHeaders  = {}

    
    globalHeaders['Content-Type'] = 'application/json'
    globalHeaders['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    

    let urlObj = new URL(urlFull)

    if (params) {
        Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]))
    }

    const response = await fetch(urlObj.href, {
        method: method,
        headers: globalHeaders,
        credentials:'same-origin',
        body: body && JSON.stringify(body),
    })

    if (response.status >= 400) {
        let returnError = {}
        returnError.code = response.status
        returnError.message = response.statusText
        returnError.details = await response.json().catch(ex => null)


        throw returnError
    }

    try {
        const json = await response.json()
        if(json['access_token']){
            localStorage.setItem('token',json['access_token'])
        }
        return json
    }
    catch (ex) {
        
        console.error(ex)
        throw ex
    }   

}