export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "front-yard", label: "Front Yard" },
      { id: "living-room", label: "Living Room" },
      { id: "kitchen", label: "Kitchen" },
      { id: "bedroom", label: "Bedroom" },

      { id: "home-gym", label: "Home Gym" },
      { id: "back-yard", label: "Back Yard" },
      { id: "garage", label: "Garage" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "philips", label: "Philips" },
      { id: "xiaomi", label: "Xiaomi" },
      { id: "amazon", label: "Amazon Alexa" },
      { id: "google", label: "Google Nest" },
      { id: "samsung", label: "Samsung SmartThings" },
      { id: "ecobee", label: "Ecobee" },
      { id: "eufy", label: "Eufy" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "front-yard",
    label: "Front Yard",
    path: "/shop/listing",
  },
  {
    id: "living-room",
    label: "Living Room",
    path: "/shop/listing",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    path: "/shop/listing",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    path: "/shop/listing",
  },

  {
    id: "home-gym",
    label: "Home Gym",
    path: "/shop/listing",
  },
  {
    id: "garage",
    label: "Garage",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "🔎",
    path: "/shop/search",
  },
];

export const filterOptions = {
  category: [
    { id: "front-yard", label: "Front Yard" },
    { id: "living-room", label: "Living Room" },
    { id: "kitchen", label: "Kitchen" },
    { id: "bedroom", label: "Bedroom" },

    { id: "home-gym", label: "Home Gym" },
    { id: "back-yard", label: "Back Yard" },
    { id: "garage", label: "Garage" },
  ],
  brand: [
    { id: "philips", label: "Philips" },
    { id: "xiaomi", label: "Xiaomi" },
    { id: "amazon", label: "Amazon Alexa" },
    { id: "google", label: "Google Nest" },
    { id: "samsung", label: "Samsung SmartThings" },
    { id: "ecobee", label: "Ecobee" },
    { id: "eufy", label: "Eufy" },
  ],
};

// Mapping for easy reference
export const categoryOptionsMap = {
  "front-yard": "Front Yard",
  "living-room": "Living Room",
  kitchen: "Kitchen",
  bedroom: "Bedroom",

  "home-gym": "Home Gym",
  "back-yard": "Back Yard",
  garage: "Garage",
};

export const brandOptionsMap = {
  philips: "Philips",
  xiaomi: "Xiaomi",
  amazon: "Amazon Alexa",
  google: "Google Nest",
  samsung: "Samsung SmartThings",
  ecobee: "Ecobee",
  eufy: "Eufy",
};

// Below will be changed

// export const addProductFormElements = [
//   {
//     label: "Title",
//     name: "title",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product title",
//   },
//   {
//     label: "Description",
//     name: "description",
//     componentType: "textarea",
//     placeholder: "Enter product description",
//   },
//   {
//     label: "Category",
//     name: "category",
//     componentType: "select",
//     options: [
//       { id: "men", label: "Men" },
//       { id: "women", label: "Women" },
//       { id: "kids", label: "Kids" },
//       { id: "accessories", label: "Accessories" },
//       { id: "footwear", label: "Footwear" },
//     ],
//   },
//   {
//     label: "Brand",
//     name: "brand",
//     componentType: "select",
//     options: [
//       { id: "nike", label: "Nike" },
//       { id: "adidas", label: "Adidas" },
//       { id: "puma", label: "Puma" },
//       { id: "levi", label: "Levi's" },
//       { id: "zara", label: "Zara" },
//       { id: "h&m", label: "H&M" },
//     ],
//   },
//   {
//     label: "Price",
//     name: "price",
//     componentType: "input",
//     type: "number",
//     placeholder: "Enter product price",
//   },
//   {
//     label: "Sale Price",
//     name: "salePrice",
//     componentType: "input",
//     type: "number",
//     placeholder: "Enter sale price (optional)",
//   },
//   {
//     label: "Total Stock",
//     name: "totalStock",
//     componentType: "input",
//     type: "number",
//     placeholder: "Enter total stock",
//   },
// ];

// export const shoppingViewHeaderMenuItems = [
//   {
//     id: "home",
//     label: "Home",
//     path: "/shop/home",
//   },
//   {
//     id: "products",
//     label: "Products",
//     path: "/shop/listing",
//   },
//   {
//     id: "men",
//     label: "Men",
//     path: "/shop/listing",
//   },
//   {
//     id: "women",
//     label: "Women",
//     path: "/shop/listing",
//   },
//   {
//     id: "kids",
//     label: "Kids",
//     path: "/shop/listing",
//   },
//   {
//     id: "footwear",
//     label: "Footwear",
//     path: "/shop/listing",
//   },
//   {
//     id: "accessories",
//     label: "Accessories",
//     path: "/shop/listing",
//   },
//   {
//     id: "search",
//     label: "🔎",
//     path: "/shop/search",
//   },
// ];
// export const filterOptions = {
//   category: [
//     { id: "men", label: "Men" },
//     { id: "women", label: "Women" },
//     { id: "kids", label: "Kids" },
//     { id: "accessories", label: "Accessories" },
//     { id: "footwear", label: "Footwear" },
//   ],
//   brand: [
//     { id: "nike", label: "Nike" },
//     { id: "adidas", label: "Adidas" },
//     { id: "puma", label: "Puma" },
//     { id: "levi", label: "Levi's" },
//     { id: "zara", label: "Zara" },
//     { id: "h&m", label: "H&M" },
//   ],
// };

// export const categoryOptionsMap = {
//   men: "Men",
//   women: "Women",
//   kids: "Kids",
//   accessories: "Accessories",
//   footwear: "Footwear",
// };

// export const brandOptionsMap = {
//   nike: "Nike",
//   adidas: "Adidas",
//   puma: "Puma",
//   levi: "Levi",
//   zara: "Zara",
//   "h&m": "H&M",
// };
