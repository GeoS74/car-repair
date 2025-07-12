import { useEffect, useState } from "react";

import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import tokenManager from "../../../../libs/token.manager";
import { responseNotIsArray } from "../../../../middleware/response.validator";


export default function UploadInfo() {
  // const [countPoint, setCountPoint] = useState(0);
  const [uploadState, setUploadState] = useState<{message: string}>();

  useEffect(() => { // для возможных утечек памяти ;-)
    return () => clearTimeout(timer);
  })

  const timer = setTimeout(() => {
    _getUploadState(setUploadState);
  }, 1000);

  if(uploadState?.message === 'загрузка файла завершена'){
    clearTimeout(timer);
    return  <div>
    {`${uploadState?.message || ''}`}
  </div>
  }

  return  <div>
    {`Файл загружается, пожалуйста подождите: ${uploadState?.message || ''}`}
  </div>
}

function _getUploadState(
  setUploadState: React.Dispatch<React.SetStateAction<{
      message: string;
  } | undefined>>
) {
  return fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/cars/upload/state`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setUploadState(res);
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}
