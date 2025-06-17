import DocBar from "../DocBar/DocBar";
import { ReactComponent as IconFoo } from "../../DocBarPanel/icons/foo.svg";
import session from "../../../../libs/token.manager";

/**
 * отрисовывает только счета и только для директора
 */

export default function DocBarInvoiceForDirecto() {
  const invoiceId = _getInvoiseId();

  if (_isDirector() && invoiceId) {
    return <DocBar
      title="Счета на подпись"
      Icon={IconFoo}
      queryString={`?task=${invoiceId}&acceptor=0&limit=50`}
    />
  }

  return <></>
}

// ЗАВИСИМОСТЬ от названия роли!!!
function _isDirector() {
  return session.getMe()?.roles.find(r => r.title === 'Директор');
}

// ЗАВИСИМОСТЬ от названия типа документа!!!
function _getInvoiseId() {
  let invoiceId = 0;

  session.getMe()?.roles.map(r => {
    r.directings.map(d => {
      d.tasks.map(t => {
        if (t.title === 'Счёт') {
          invoiceId = t.id;
        }
      })
    })
  });
  return invoiceId
}