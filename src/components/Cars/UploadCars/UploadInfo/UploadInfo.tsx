import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
  isUploadCars: UploadExcelState
}

export default function UploadInfo({ isUploadCars }: Props) {
  const [countPoint, setCountPoint] = useState(0);

  if (isUploadCars === 'upload') {
    setTimeout(() => {
      let newCount = 0
      if (countPoint < 3) newCount = countPoint + 1;
      setCountPoint(newCount);
    }, 800)

    return <>
      {`Файл загружается, пожалуйста подождите ${new Array(countPoint).fill('.').join('')}`}
    </>
  }

  return <>
    {`Файл успешно загружен, ${<Link to="/cars/upload/excel">sdfsd</Link>}`}
  </>
}
