# Компонента SimpleList

 SimpleList - простой список с набором CRUD-операций.

 Отрисовать список элементов:
 ```tsx
<SimpleList typeList="anyNameList"/>
 ```

 При добавлении новых страниц со списками надо откорректировать конфиг списка в файле `SimpleList.tsx` добавив примерно такой объект:
```tsx
const dataList: Props = {
  anyNameList: {
    title: "Заголовок списка",
    placeholder: "плейсхолдер поля ввода",
    api: "/api/anyNameList",
  },
}
```
здесь `api` -  это маршрут к API  бекэнда