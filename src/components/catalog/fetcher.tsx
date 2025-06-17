import serviceHost from "../../libs/service.host"

export default async function fetcher(
  query: string,
  offset?: number,
  limit?: number,
  last?: number,
) : Promise<ISearchResult | undefined> {
  return fetch(`${serviceHost("bridge")}/api/bridge/search/?query=${query}&offset=${offset || ''}&limit=${limit || ''}&last=${last || ''}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        // console.log(res)
        return res;
      }
      else if ([400, 404].includes(response.status)) {
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}
