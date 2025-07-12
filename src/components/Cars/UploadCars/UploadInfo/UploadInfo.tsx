import { useEffect, useState } from "react";

import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import tokenManager from "../../../../libs/token.manager";
import { responseNotIsArray } from "../../../../middleware/response.validator";


export default function UploadInfo() {
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
    <div>
    {`Файл загружается, пожалуйста подождите: ${uploadState?.message || ''}`}
    </div>
    <button
      type="button"
      className="btn btn-outline-warning mt-4"
      onClick={() =>_stopProcess(setUploadState)}>Остановить загрузку</button>
  </div>
}

function _stopProcess(
  setUploadState: React.Dispatch<React.SetStateAction<{
      message: string;
  } | undefined>>
) {
  if(!confirm('Вы уверены, что хотите остановить загрузку файла?')) {
    return;
  }

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/cars/upload/kill`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
  .finally(() => setUploadState({message: 'загрузка файла завершена'}));
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
