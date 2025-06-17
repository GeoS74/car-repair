declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
type StyleTheme = "dark" | "light"
interface IThemeContext {
    theme: StyleTheme;
    setTheme: Dispatch<SetStateAction<StyleTheme>>;
}

type ServiceName = "bridge" | "mauth" | "informator" | "mnote"
type PopupMode = "success" | "danger" | undefined
type AuthFormMode = "signin" | "signup" | "forgot"
type SignatoryMode = "acceptor" | "recipient"
type ActionMode = "Создать" | "Редактировать" | "Удалить" | "Согласовать" | "Ознакомиться"
type DocTemplateName = "invoice"
/*
* тип, устанавливающий возможные значения режима информационного сообщения (подтверждение email, сброс пароля)
*/
type AuthInfoCardMode = "confirm" | "recovery"

/*
* интерфейс объекта одно записи, возвращаемой бэкендом
* бэкенд списка возвращает массив таких объектов
*/
interface ISimpleRow {
  id: number
  title: string
}

/*
* интерфейс объекта ответа, возвращаемого микросервисом "informator"
*/
interface IAbout {
  alias: string
  mdInfo: string
}

/*
* интерфейс объекта ответа, возвращаемого микросервисом "mnote"
*/
interface ISlider {
  files: IStaticFile[] | [],
  id: string,
  isPublic: boolean,
  title: string, message: string,
}

/*
* интерфейс объекта, возвращаемого бэкендом при успешной авторизации
*/
interface IAuthResponse {
  access: string
  refresh: string
}
/*
* интерфейс объекта ошибки
*/
interface IErrorMessage {
  message: string
  field: string
}

/*
* интерфейс объекта ответа, возвращаемого микросервисом "bridge"
*/
interface ISearchResult {
  limit: number
  offset: number
  positions: IProduct[]
}
/*
* интерфейс объекта продукта, возвращаемого микросервисом "bridge"
*/
interface IProduct {
  id:number
  createdAt: string
  brandId: number
  brantTitle: string
  providerId: number
  providerTitle: string
  code: string
  article: string
  title: string
  price: number
  amount: number
  manufacturer: string
  weight: string
  width: string
  height: string
  length: string
  manufacturer: string
  stock: string
  photo: string
  alias: string
  // storage: unknown
}

interface IDoc {
  id: string
  num: number
  title: string
  description: string
  directing: ISimpleRow
  task: ISimpleRow
  author: IDocUnit
  files: IStaticFile[]
  createdAt: string
  acceptor: IDocSignatory[]
  recipient: IDocSignatory[]

  deadLine?: string
  sum?: number
}

interface IDocUnit {
  uid: string
  email: string
  name: string
  position: string
}

interface IDocSignatory extends IDocUnit{
  accept: boolean
}

interface IStaticFile {
  originalName: string
  fileName: string
}

interface IRole extends ISimpleRow {
  directings: IDirecting[]
}

interface IDirecting extends ISimpleRow {
  tasks: ITask[]
}

interface ITask extends ISimpleRow {
  actions: ISimpleRow[]
}


/*
*интерфейс настроек компоненты  SimpleList
*/
interface ISimpleListConf {
  brands: IListConf,
  providers: IListConf,
  roles: IListConf,
  directings: IListConf,
  tasks: IListConf,
  actions: IListConf
}

interface IListConf {
  serviceName: ServiceName
  title: string
  placeholderSearch: string
  placeholder: string
  api: string
}

interface IUser {
  uid: string
  email: string
  rank: string
  roles: IRole[]
  name: string
  photo: string
  createdAt: string
  status?: string
}

type DocType = {
  directing: IDirecting
  task?: ITask
}

// интерфейс настроек компоненты NewsLine

interface INews {
  createdAt: string
  files: IStaticFile[]
  id: string
  isPublic: boolean
  message: string
  title: string
  updatedAt: string    
}










// Получаем массив при запросе с /api/informator/user/all
type PropsUserList = {
  uid: string,
  email: string,
  photo: string,
  name: string
  roles: Array<PropsRoles>,
}
//  массив из type PropsUserList -> roles
type PropsRoles = {
  directings: [],
  id: string,
  title: string
}
