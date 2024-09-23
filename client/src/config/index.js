export const registerFormControls = [
	{
		name: "userName",
		label: "User Name",
		placeholder: "Enter User Name...",
		element: "input",
		type: "text"
	},
	{
		name: "email",
		label: "Email Address",
		placeholder: "Enter Email Address...",
		element: "input",
		type: "email"
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter Password...",
		element: "input",
		type: "password"
	}
];

export const loginFormControls = [
	{
		name: "email",
		label: "Email Address",
		placeholder: "Enter Email Address...",
		element: "input",
		type: "email"
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter Password...",
		element: "input",
		type: "password"
	}
];

export const addProductFormElements = [
	{
		label: "Title",
		name: "title",
		element: "input",
		type: "text",
		placeholder: "Enter product title",
	},
	{
		label: "Description",
		name: "description",
		element: "textarea",
		placeholder: "Enter product description",
	},
	{
		label: "Category",
		name: "category",
		element: "select",
		options: [
			{ id: "men", label: "Men" },
			{ id: "women", label: "Women" },
			{ id: "kids", label: "Kids" },
			{ id: "accessories", label: "Accessories" },
			{ id: "footwear", label: "Footwear" },
			{ id: "gadgets", label: "Gadgets" },
		],
		placeholder: "Select Category",
	},
	{
		label: "Brand",
		name: "brand",
		element: "select",
		options: [
			{ id: "nike", label: "Nike" },
			{ id: "adidas", label: "Adidas" },
			{ id: "puma", label: "Puma" },
			{ id: "levi", label: "Levi's" },
			{ id: "zara", label: "Zara" },
			{ id: "h&m", label: "H&M" },
		],
		placeholder: "Select Brand",
	},
	{
		label: "Price",
		name: "price",
		element: "input",
		type: "number",
		placeholder: "Enter product price",
	},
	{
		label: "Sale Price",
		name: "salePrice",
		element: "input",
		type: "number",
		placeholder: "Enter sale price (optional)",
	},
	{
		label: "Total Stock",
		name: "totalStock",
		element: "input",
		type: "number",
		placeholder: "Enter total stock",
	},
];

export const shopMenuItems = [
	{
		id: "home",
		label: "Home",
		path: "/shop/home"
	},
	{
		id: "men",
		label: "Men",
		path: "/shop/listing"
	},
	{
		id: "women",
		label: "Women",
		path: "/shop/listing"
	},
	{
		id: "kids",
		label: "Kids",
		path: "/shop/listing"
	},
	{
		id: "accessories",
		label: "Accessories",
		path: "/shop/listing"
	},
	{
		id: "footwear",
		label: "Footwear",
		path: "/shop/listing"
	},
	{
		id: "gadgets",
		label: "Gadgets",
		path: "/shop/listing"
	},
];

export const filterOptions = {
	category: [
		{ id: "men", label: "Men" },
		{ id: "women", label: "Women" },
		{ id: "kids", label: "Kids" },
		{ id: "accessories", label: "Accessories" },
		{ id: "footwear", label: "Footwear" },
		{ id: "gadgets", label: "Gadgets" },
	],
	brand: [
		{ id: "nike", label: "Nike" },
		{ id: "adidas", label: "Adidas" },
		{ id: "puma", label: "Puma" },
		{ id: "levi", label: "Levi's" },
		{ id: "zara", label: "Zara" },
		{ id: "h&m", label: "H&M" },
	],
};

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
		element: "input",
		type: "text",
		placeholder: "Enter your address",
	},
	{
		label: "City",
		name: "city",
		element: "input",
		type: "text",
		placeholder: "Enter your city",
	},
	{
		label: "Pincode",
		name: "pincode",
		element: "input",
		type: "text",
		placeholder: "Enter your pincode",
	},
	{
		label: "Phone",
		name: "phone",
		element: "input",
		type: "text",
		placeholder: "Enter your phone number",
	},
	{
		label: "Notes",
		name: "notes",
		element: "textarea",
		placeholder: "Enter any additional notes",
	},
];