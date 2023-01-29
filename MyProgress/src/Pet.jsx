import { Link } from "react-router-dom"

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg"
  if (images.length) {
    hero = images[0]
  }

  return (
    // using Link from react-router-dom is better for performance than using <a> tag
    <Link to={`/details/${id}`} className="relative block">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent p-2">
        <h1 className="mb-0.5 text-4xl font-medium">{name}</h1>
        <h2 className="text-base font-medium">
          {animal} – {breed} – {location}
        </h2>
      </div>
    </Link>
  )
}

export default Pet
