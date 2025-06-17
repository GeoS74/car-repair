import { useState } from "react"
import classNames from "classnames"

import {MainTab} from "./tabs/MainTab"
import {OptionalTab} from "./tabs/OptionalTab"
import {PropertiesTab} from "./tabs/PropertiesTab"
import styles from "./styles.module.css"

/*
* тип, устанавливающий возможные имен вкладок формы загрузки прайса
*/
type activeTabName = "main" | "optional" | "properties"

export const UploadPriceFormTabPane = () => {
  const [activeTab, setActiveTab] = useState<activeTabName>("main")

  return <div className={styles.root}>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <span
          onClick={() => setActiveTab("main")}
          className={classNames("nav-link", activeTab === "main" ? "active" : "")}>Основные</span>
      </li>
      <li className="nav-item">
        <span
          onClick={() => setActiveTab("optional")}
          className={classNames("nav-link", activeTab === "optional" ? "active" : "")}>Дополнительные</span>
      </li>
      <li className="nav-item">
        <span
          onClick={() => setActiveTab("properties")}
          className={classNames("nav-link", activeTab === "properties" ? "active" : "")}>Характеристики</span>
      </li>
    </ul>

    <div className="tab-content">
      <div className={classNames("tab-pane fade", activeTab === "main" ? "active show" : "")}>
        <MainTab />
      </div>
      <div className={classNames("tab-pane fade", activeTab === "optional" ? "active show" : "")}>
        <OptionalTab />
      </div>
      <div className={classNames("tab-pane fade", activeTab === "properties" ? "active show" : "")}>
        <PropertiesTab />
      </div>
    </div>
  </div>
}

