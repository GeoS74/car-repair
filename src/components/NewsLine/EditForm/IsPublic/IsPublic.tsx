import styles from "./styles.module.css"

export default function IsPublic({isPublic}: {isPublic: boolean}) {
    return (
        <div className={styles.isPablick}>
              <input type="checkbox" id="isPablick" value="true" name="isPublic" defaultChecked={isPublic}/>
              <label htmlFor="isPablick">Опубликовать</label>
            </div>
    )
}