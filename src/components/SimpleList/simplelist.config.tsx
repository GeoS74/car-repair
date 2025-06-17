export const simpleListConfig: ISimpleListConf  =  {
    brands: {
        serviceName: 'bridge',
        title: "Список брендов",
        placeholderSearch: "поиск брендов",
        placeholder: "Бренд",
        api: "/api/bridge/brands",
      },
      providers: {
        serviceName: 'bridge',
        title: "Список поставщиков",
        placeholderSearch: "поиск поставщиков",
        placeholder: "Поставщик",
        api: "/api/bridge/providers",
      },
      roles: {
        serviceName: 'informator',
        title: "Список ролей",
        placeholderSearch: "поиск ролей",
        placeholder: "Роль",
        api: "/api/informator/role",
      },
      directings: {
        serviceName: 'informator',
        title: "Список направлений",
        placeholderSearch: "поиск направлений",
        placeholder: "Направление",
        api: "/api/informator/directing",
      },
      tasks: {
        serviceName: 'informator',
        title: "Список объектов",
        placeholderSearch: "поиск объектов",
        placeholder: "Объект",
        api: "/api/informator/task",
      },
      actions: {
        serviceName: 'informator',
        title: "Список действий",
        placeholderSearch: "поиск действий",
        placeholder: "Действие",
        api: "/api/informator/action",
      },
}