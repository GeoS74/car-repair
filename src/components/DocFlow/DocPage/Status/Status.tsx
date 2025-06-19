import { useSelector } from "react-redux";
import { StoreState } from "../../../../store";

type Props = {
  statusCode?: number
}

export default function Status({ statusCode }: Props) {
  const status = useSelector((state: StoreState) => state.status.items);

  const currentStatus = status.find(s => s.code === statusCode);

  return <div className="mt-4"> <p><span className="badge bg-success">{currentStatus?.title}</span> </p></div>
}