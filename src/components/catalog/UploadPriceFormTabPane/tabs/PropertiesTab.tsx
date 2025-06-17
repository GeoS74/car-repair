export const PropertiesTab = () => {
  return <>
    <div className="form-group mt-4">
      <h5>Укажите номера соответствующих колонок файла Excel</h5>
    </div>

    <div className="form-group col-sm-3">
      <label htmlFor="weight" className="form-label mt-3">Вес, кг</label>
      <input type="text" name="weight" className="form-control" id="weight" />

      <label htmlFor="length" className="form-label mt-3">Длина, мм</label>
      <input type="text" name="length" className="form-control" id="length" />

      <label htmlFor="width" className="form-label mt-3">Ширина, мм</label>
      <input type="text" name="width" className="form-control" id="width" />

      <label htmlFor="height" className="form-label mt-3">Высота, мм</label>
      <input type="text" name="height" className="form-control" id="height" />
    </div>
  </>
}