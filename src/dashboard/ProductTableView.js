import React from 'react';

const ProductTableView = ({ products }) => {

    const base64ToUrl = (base64String) => `data:image/jpegx;base64,${base64String}`;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Old Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Offer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={base64ToUrl(product.imageBase64)} alt={product.name} className="h-10 w-10 object-cover" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.rating || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              &#8377;{product.afterOfferPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              &#8377;{product.beforeOfferPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.offer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.description}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <a href={`/product/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
                  View
                </a>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableView;
