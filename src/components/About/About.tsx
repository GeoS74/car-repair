import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import Content from "./Content/Content";
import EditButton from "./EditButton/EditButton";
import EditForm from "./EditForm/EditForm";
import session from "../../libs/token.manager"
import Footer from "../Footer/Footer"
import styles from "./styles.module.css"

type Props = {
  alias: string
}

export default function About({ alias }: Props) {
  const [about, setAbout] = useState(useLoaderData() as IAbout | undefined)
  const [editMode, setEditMode] = useState(false)

  session.subscribe('about')

  return <>
    <Navigate />

    <div className={styles.root} style={{ minHeight: `${window.innerHeight - 200}px` }}>
      {editMode ?
        <EditForm alias={alias} about={about} setAbout={setAbout} editMode={editMode} setEditMode={setEditMode} />
        : <>
          <Content about={about} />

          {/* эта кнопка должна быть доступна только админу */}
          {session.getMe()?.rank === 'admin' ? <EditButton editMode={editMode} setEditMode={setEditMode} /> : <></>}
        </>}
    </div>

    <Footer />
  </>
}