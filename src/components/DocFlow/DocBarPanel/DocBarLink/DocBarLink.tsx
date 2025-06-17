import { useNavigate } from "react-router-dom";

import styles from "../DocBar/styles.module.css";

type Props = {
  title: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>
  queryString: string
};

export default function DocBar({ title, Icon, queryString }: Props) {
  const navigate = useNavigate();

  return <div className={styles.root}
    onClick={() => navigate(`${queryString}`, {
      state: {titleDocList: title}
    })}
  >
    <h5>{title}</h5>
    <div className="mt-3"><Icon className={styles.svg}/></div>
    <p><br/></p>
  </div>
}
