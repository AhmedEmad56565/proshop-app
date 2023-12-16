import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function AdminPaginate({ pages, page, routeName }) {
  return (
    pages > 1 && (
      // <Pagination className={'justify-content-md-center'}>
      <Pagination className={'justify-content-center'}>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1}
            to={`/admin/${routeName}-list/page/${p + 1}`}
          >
            <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}
