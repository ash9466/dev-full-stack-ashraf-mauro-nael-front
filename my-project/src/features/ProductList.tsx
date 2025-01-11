import { Link, useNavigate } from "react-router-dom";

const callouts = [
  {
    id: 1,
    name: 'Basic Tee (Black)',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$40',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee 2 (Green)',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in green.",
    price: '$35',
    color: 'Black',
  },
]

export default function ProductList() {

  const navigate = useNavigate();
  
  const navigateToHopePage = (productId) => {
    navigate(`/product/${productId}`);
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">HOPES</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative" onClick={() => navigateToHopePage(callout.id)}>
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  <span className="absolute inset-0" />
                  {callout.name}
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

