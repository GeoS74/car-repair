import { useState } from "react"

type Props = {
  setIsUploadCars: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UploadInfo ({setIsUploadCars}: Props) {
  const [countPoint, setCountPoint] = useState(0);

  setTimeout(() => {
    let newCount = 0
    if(countPoint < 3) newCount = countPoint+1;
    setCountPoint(newCount);
  }, 800)

  return <>
    {`Файл загружается, пожалуйста подождите ${new Array(countPoint).fill('.').join('')}`}
  </>
}
