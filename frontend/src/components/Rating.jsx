import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value, text }) {
  const dynamicStarsList = [1, 2, 3, 4, 5].map((index) =>
    value >= index ? (
      <span key={index}>
        <FaStar key={'fullStar' + index} />
      </span>
    ) : value >= index - 0.5 ? (
      <span key={index}>
        <FaStarHalfAlt key={'halfStar' + index} />
      </span>
    ) : (
      <span key={index}>
        <FaRegStar key={'emptyStar' + index} />
      </span>
    )
  );

  return (
    <div className='rating'>
      {dynamicStarsList}
      <span className='rating-text'>{text}</span>
    </div>
  );
}
