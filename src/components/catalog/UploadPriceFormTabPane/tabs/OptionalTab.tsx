export const OptionalTab = () => {
  return <>
    <div className="form-group mt-4">
      <h5>Укажите номера соответствующих колонок файла Excel</h5>
    </div>

    <div className="form-group col-sm-3">
      <label htmlFor="startRow" className="form-label mt-2">Начальная строка</label>
      <input type="text" name="startRow" className="form-control" id="startRow" defaultValue={1} />
    </div>

    <div className="form-group col-sm-3">
      <label htmlFor="endRow" className="form-label mt-3">Конечная строка</label>
      <input type="text" name="endRow" className="form-control" id="endRow" />
      <small className="form-text text-muted">Если не указать, то будет прочитан весь файл</small>
    </div>

    <div className="form-group col-sm-3">
      <label htmlFor="article" className="form-label mt-3">Артикл</label>
      <input type="text" name="article" className="form-control" id="article" defaultValue={1} />

      <label htmlFor="title" className="form-label mt-3">Наименование</label>
      <input type="text" name="title" className="form-control" id="title" defaultValue={2} />

      <label htmlFor="price" className="form-label mt-3">Цена</label>
      <input type="text" name="price" className="form-control" id="price" defaultValue={3} />

      <label htmlFor="profit" className="form-label mt-3">Наценка</label>
      <input type="text" name="profit" className="form-control" id="profit" />

      <label htmlFor="amount" className="form-label mt-3">Количество</label>
      <input type="text" name="amount" className="form-control" id="amount" />

      <label htmlFor="manufacturer" className="form-label mt-2">Производитель</label>
      <input type="text" name="manufacturer" className="form-control" id="manufacturer" />

      <label htmlFor="code" className="form-label mt-3">Код позиции</label>
      <input type="text" name="code" className="form-control" id="code" />
    </div>
  </>
}
