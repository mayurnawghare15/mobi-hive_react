// ProductCardContainer.js
import React from 'react';
import ProductCard from './ProductCard';

const ProductCardContainer = ({ deviceData }) => {
    return (
        <div>
            {/* Render the count */}
            <p>Number of devices: {deviceData.length}</p>

            {/* Render the ProductCard components */}
            {deviceData.map((device, index) => (
                <ProductCard key={index} device={device} />
            ))}
        </div>
    );
};

export default ProductCardContainer;
