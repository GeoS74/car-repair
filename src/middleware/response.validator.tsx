export function responseNotIsArray(response: Response | Response[]){
  if (Array.isArray(response)) {
    throw new Error(`error: response not is array`)
  }
  return response
}