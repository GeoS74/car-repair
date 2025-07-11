import { useEffect, useState } from "react";

import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import tokenManager from "../../../../libs/token.manager";
import { responseNotIsArray } from "../../../../middleware/response.validator";


export default function UploadInfo() {
  // const [countPoint, setCountPoint] = useState(0);
  const [uploadState, setUploadState] = useState<sendChildProcess>();

  // useEffect(() => {
  //   let isMounted = true; // флаг того что компонент смононтирован

  //   const poll = () => {
  //     if(uploadState !== 'загрузка файла завершена' && isMounted){
  //       _getUploadState(setUploadState)
  //         .catch(error => console.log(`error upload ${error}`))
  //         .finally(() => {
  //           if(isMounted) {
  //             const timer = setTimeout(poll, 2000);
  //           }
  //         });
  //     }
  //   }

  //   poll(); //  начало опроса

  //   return () => {isMounted = false}; //  компонет размонтирован

  // }, [uploadState]);


  // useEffect(() => {

  //   const timer = setTimeout(async () => {
  //     await _getUploadState(setUploadState)
  //     .catch(error => console.log(`error upload ${error}`))
  //   }, 2000);
    
  //   return () => {clearTimeout(timer)}; //  компонет размонтирован

  // }, []);




  // useEffect(() => {
  //   if(uploadState !== 'загрузка файла завершена') {
  //     const timer = setTimeout(() => {
  //       console.log('опрос');
  //       _getUploadState(setUploadState);
  //     }, 2000);
  //   }
  // });

  useEffect(() => { // для возможных утечек памяти ;-)
    return () => clearTimeout(timer);
  })



  const timer = setTimeout(() => {
    console.log('опрос');
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
  setUploadState: React.Dispatch<React.SetStateAction<sendChildProcess | undefined>>
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
        console.log('server send');
        console.log(res);
        setUploadState(res);
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}
