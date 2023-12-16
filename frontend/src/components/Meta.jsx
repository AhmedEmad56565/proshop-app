import { Helmet } from 'react-helmet-async';

export default function Meta({
  title = 'Welcome To ProShop',
  description = 'We sell the best products for cheap',
  keywords = 'electronics, buy electronics, cheap electroincs',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
}