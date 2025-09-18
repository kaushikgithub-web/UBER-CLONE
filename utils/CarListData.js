// utils/CarListData.js

const CarListData = [
  {
    id: 1,
    name: "Auto",
    desc: "Affordable rides for short distances",
    seat: 3,
    image: "/auto.png",
    multiplier: 0.6,    // 60% of Economy
  },
  {
    id: 2,
    name: "Economy",
    desc: "Affordable everyday rides",
    seat: 4,
    image: "/economy.png",
    multiplier: 1,      // Base fare
  },
  {
    id: 3,
    name: "Premium",
    desc: "Comfortable premium rides",
    seat: 4,
    image: "/premium.png",
    multiplier: 1.5,    // 150% of Economy
  },
  {
    id: 4,
    name: "XL",
    desc: "Spacious rides for groups",
    seat: 6,
    image: "/xlcar.png",
    multiplier: 2,      // 200% of Economy
  },
  {
    id: 5,
    name: "Bike",
    desc: "Quick and cheap bike rides",
    seat: 1,
    image: "/bike.png",
    multiplier: 0.7,    // 70% of Economy
  },
];

export default CarListData;
