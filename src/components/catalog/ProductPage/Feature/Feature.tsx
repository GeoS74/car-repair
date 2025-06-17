export default function Feature({
  title,
  article,
  manufacturer,
  amount, price,
  width,
  height,
  length,
  weight,
}: IProduct) {
  return <div>
    <h2>{title}</h2>
    <p><span className="text-muted">Артикл:</span> {article}</p>
    <p><span className="text-muted">Производитель:</span> {manufacturer}</p>
    <p><span className="text-muted">Количество:</span> {+amount || "под заказ"}</p>
    <p><span className="text-muted">Цена за ед.:</span> {+price || <small>Уточняйте у менеджера</small>}</p>

    <p hidden={width === "0.00"}><span className="text-muted">Ширина:</span> {width}</p>
    <p hidden={height === "0.00"}><span className="text-muted">Высота:</span> {height}</p>
    <p hidden={length === "0.00"}><span className="text-muted">Длина:</span> {length}</p>
    <p hidden={weight === "0.00"}><span className="text-muted">Вес:</span> {weight}</p>

    {/* <p><span className="text-muted">{product.stock}</span></p> */}
  </div>
}