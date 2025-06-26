type Props = {
  cars: ICar[]
  setCurrentCar: React.Dispatch<React.SetStateAction<ICar | undefined>>
}

// export default function CityList({ cities, setCities, setACtiveCity }: Props) {
//   return cities.length ? <ul>{_makeLi(cities, setCities, setACtiveCity)}</ul> : <></>
// }

// function _makeLi(
//   cities: ICity[],
//   setCities: React.Dispatch<React.SetStateAction<ICity[]>>,
//   setACtiveCity: React.Dispatch<React.SetStateAction<ICity | undefined>>
// ) {
//   return cities.map((city, index) => {
//     return <li 
//     key={index} 
//     onClickCapture={() => {
//       setACtiveCity(city)
//       setCities([])

//     }}
//     >
//       {city.fullname}
//     </li>
//   })
// }

export default function SelectCarList({ cars, setCurrentCar }: Props) {
  return cars.length ? <ul>{_makeLi(cars, setCurrentCar)}</ul> : <></>
}

function _makeLi(
  cars: ICar[],
  setCurrentCar: React.Dispatch<React.SetStateAction<ICar | undefined>>
) {
  return cars.map((car, index) => {
    return <li
      key={index}
      onClickCapture={() => {
        setCurrentCar(car)
      }}
    >
      {`${car.carModel} ${car.stateNumber} ${car.vin}`}
    </li>
  })
}