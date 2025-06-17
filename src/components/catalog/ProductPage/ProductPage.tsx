import { useLoaderData } from "react-router-dom"
import Image from "./Image/Image";
import Feature from "./Feature/Feature";
import SearchForm from "../../Main/SearchForm/SearchForm";
import classNames from "classnames";
import styles from "./styles.module.css"

export default function ProductPage() {
    const product = useLoaderData() as IProduct;

    return <>
    <SearchForm />

    <div className={classNames(styles.root)}>
        <Image {...product} />
        <Feature {...product} />
    </div>
    </>
}