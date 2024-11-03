import React from 'react';
import '../../css/Category.css';
import defaultFileImg from '../../images/defaultFileImg.png';

const ProductLine = ({ products = {} }) => {

  const bucketName = process.env.REACT_APP_BUCKET_NAME;

  const handleItemClick = (auctionIndex) => {
    window.location.href = `/category-itemdetail/${auctionIndex}`;
  };

  return (
    <div className='CTG_productLine'>
      <div className='CTG_grid-container-product'>
        {Object.values(products).map((product) => {
          const bids = product.auctionInfoDtoList ? product.auctionInfoDtoList.length : 0;

          const timeLeft = new Date(product.endingLocalDateTime) - new Date();

          let timeLeftFormatted;
          if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); 
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); 
            timeLeftFormatted = `${days > 0 ? `${days}일 ` : ''}${hours}시간 ${minutes}분 남음`;
          } else {
            timeLeftFormatted = '경매 종료';
          }

          // 이미지 URL 설정
          const thumbnailImage = product.auctionImageDtoList.find(image => image.thumbnail === true);
          const imageSrc = thumbnailImage && thumbnailImage.filetype === 'image'
            ? `https://kr.object.ncloudstorage.com/${bucketName}/${thumbnailImage.filepath}${thumbnailImage.filename}`
            : defaultFileImg;

          return (
            <div className='CTG_flex-item' key={product.auctionIndex}>
              <img src={imageSrc}
                className="CTG_grid-item-product"
                alt={product.productName} 
                onClick={() => handleItemClick(product.auctionIndex)}
              />
              <div className='CTG_grid-item-text'>
                <div className='CTG_productText'>
                  <p className="CTG_productName">{product.productName}</p>
                  <p className="CTG_startingPrice">
                                        {product.startingPrice !== null && 
                                        (product.auctionInfoDtoList.length === 0 || 
                                            product.auctionInfoDtoList[product.auctionInfoDtoList.length - 1].bidderIndex === null)
                                            ? product.startingPrice.toLocaleString() 
                                            : product.auctionInfoDtoList.length > 0 
                                            ? product.auctionInfoDtoList[product.auctionInfoDtoList.length - 1].bidAmount.toLocaleString() 
                                            : '가격 정보 없음'} 원
                                        </p>
                  <p className="CTG_bidInfo">입찰 {bids}회 | {timeLeftFormatted}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
//11.03
export default ProductLine;