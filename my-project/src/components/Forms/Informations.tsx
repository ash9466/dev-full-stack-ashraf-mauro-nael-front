import { Information } from "@/models/Information"

//Test
const informations : Information[] = [
    {
      id: 1,
      title: 'Basic Tee',
      domain: '#',
      simpleDescription: 'https://tailwindui.com/plus/img/ecommerce-images/information-page-01-related-information-01.jpg',
      detailedDescription: "Front of men's Basic Tee in black.",
      link: '$35',
      access: ['Black', 'White'],
      userFeedbacks : ["C'est guez", "Incroyable !"]
    },

    {
      id: 2,
      title: 'Basic Tee',
      domain: '#',
      simpleDescription: 'https://tailwindui.com/plus/img/ecommerce-images/information-page-01-related-information-01.jpg',
      detailedDescription: "Front of men's Basic Tee in black.",
      link: '$35',
      access: ['Black', 'White'],
      userFeedbacks : ["C'est guez", "Incroyable !"]
    },
    {
      id: 2,
      title: 'Basic Tee',
      domain: '#',
      simpleDescription: 'https://tailwindui.com/plus/img/ecommerce-images/information-page-01-related-information-01.jpg',
      detailedDescription: "Front of men's Basic Tee in black.",
      link: '$35',
      access: ['Black', 'White'],
      userFeedbacks : ["C'est guez", "Incroyable !"]
    },
    {
      id: 2,
      title: 'Basic Tee',
      domain: '#',
      simpleDescription: 'https://tailwindui.com/plus/img/ecommerce-images/information-page-01-related-information-01.jpg',
      detailedDescription: "Front of men's Basic Tee in black.",
      link: '$35',
      access: ['Black', 'White'],
      userFeedbacks : ["C'est guez", "Incroyable !"]
    },
    {
      id: 2,
      title: 'Basic Tee',
      domain: '#',
      simpleDescription: 'https://tailwindui.com/plus/img/ecommerce-images/information-page-01-related-information-01.jpg',
      detailedDescription: "Front of men's Basic Tee in black.",
      link: '$35',
      access: ['Black', 'White'],
      userFeedbacks : ["C'est guez", "Incroyable !"]
    },
    {
      id: 2,
      title: 'Basic Tee',
      domain: '#',
      simpleDescription: 'https://tailwindui.com/plus/img/ecommerce-images/information-page-01-related-information-01.jpg',
      detailedDescription: "Front of men's Basic Tee in black.",
      link: '$35',
      access: ['Black', 'White'],
      userFeedbacks : ["C'est guez", "Incroyable !"]
    },
  ]
  
  export default function Informations() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {informations.map((information) => (
              <div key={information.id} className="group relative">
                <img
                  // alt={information.imageAlt}
                  // src={information.imageSrc}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={information.simpleDescription}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {information.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{information.domain}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{information.link}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }