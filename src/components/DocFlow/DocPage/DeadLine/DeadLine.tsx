import { date } from "../../../../libs/formatter"

export default function DeadLine({ deadLine }: IDoc) {
  return <div className="mt-4">
    <p>
      Планируемая дата оплаты: {deadLine ? date(deadLine) : "не установлено"}
    </p>
  </div>
}