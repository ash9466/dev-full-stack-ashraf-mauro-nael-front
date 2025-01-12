import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InitialHopes = [
  {
    id: 1,
    name: 'Basic Tee (Black)',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/hopes-page-01-related-hopes-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$40',
    color: 'Black',
    feedbacks: [
      'Eteint',
      'Super cool !',
      "Y'a mieux sah",
      "Je ne recommanderais jamais cela à personne dans ma vie !",
    ],
  },
  {
    id: 2,
    name: 'Basic Tee 2 (Green)',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/hopes-page-01-related-hopes-01.jpg',
    imageAlt: "Front of men's Basic Tee in green.",
    price: '$35',
    color: 'Black',
    feedbacks: [
      'Eteint',
      'Super cool !',
      "Y'a mieux sah",
      "Je ne recommanderais jamais cela à personne dans ma vie !",
    ],
  },
  {
    id: 3,
    name: 'Basic Tee azer(Black)',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$40',
    color: 'Black',
    feedbacks: [
      'Eteint',
      'Super cool !',
      "Y'a mieux sah",
      "Je ne recommanderais jamais cela à personne dans ma vie !",
    ],
  },
  {
    id: 4,
    name: 'Basic Tee (Blaczk)',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$40',
    color: 'Black',
    feedbacks: [
      'Eteint',
      'Super cool !',
      "Y'a mieux sah",
      "Je ne recommanderais jamais cela à personne dans ma vie !",
    ],
  },
]

export default function HopeList() {

  const [hopes, setHopes] = useState(InitialHopes);
  const navigate = useNavigate();
  
  const navigateToHopePage = (hope) => {
    navigate(`/hope/${hope.id}`, {state : { hope }});
  }

  const removeHope = (hopeId) => {
    const newHopes = hopes.filter((hope) => hope.id !== hopeId);
    setHopes(newHopes);
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">HOPES</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {hopes.map((hope) => (
              <div key={hope.id} className="group mb-20 cursor-pointer" onClick={(e) => {
                navigateToHopePage(hope);
                }}>
                <div>
                  <img
                    alt={hope.imageAlt}
                    src={hope.imageSrc}
                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <span className="absolute inset-0" />
                  {hope.name}
                </h3>
                <div className="flex justify-between">
                  <p className="text-base font-semibold text-gray-900">{hope.name}</p>
                  <button className="text-gray-500 hover:underline cursor-pointer mr-4" onClick={(e) => {
                    e.stopPropagation();
                    removeHope(hope.id);
                  }}
                    >Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

