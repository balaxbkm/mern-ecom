import { Route, Routes } from "react-router-dom"

import CheckAuth from "./components/common/check-auth"

import AuthLayout from "./components/auth/layout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"

import AdminLayout from "./components/admin/layout"
import Dashboard from "./pages/admin/dashboard"
import Products from "./pages/admin/products"
import Orders from "./pages/admin/orders"
import Settings from "./pages/admin/settings"

import ShopLayout from "./components/shop/layout"
import Home from "./pages/shop/home"
import Listing from "./pages/shop/listing"
import Checkout from "./pages/shop/checkout"
import Account from "./pages/shop/account"

import Unauth from "./pages/unauth"
import NotFound from "./pages/not-found"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import PayPalReturn from "./pages/shop/paypal-return"
import PayPalCancel from "./pages/shop/paypal-cancel"
import PaymentSuccess from "./pages/shop/payment-success"
import Search from "./pages/shop/search"

function App() {
	const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		const token = JSON.parse(sessionStorage.getItem('token'))
		dispatch(checkAuth(token));
	}, [dispatch]);

	if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

	return (
		<div className="flex flex-col overflow-hidden bg-white">
			<Routes>
				<Route path="/" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
				} />

				<Route path="/auth" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user}>
						<AuthLayout />
					</CheckAuth>
				}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/admin" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user}>
						<AdminLayout />
					</CheckAuth>
				}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="products" element={<Products />} />
					<Route path="orders" element={<Orders />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="/shop" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user}>
						<ShopLayout />
					</CheckAuth>
				}>
					<Route path="search" element={<Search />} />
					<Route path="home" element={<Home />} />
					<Route path="listing" element={<Listing />} />
					<Route path="checkout" element={<Checkout />} />
					<Route path="account" element={<Account />} />
					<Route path="paypal-return" element={<PayPalReturn />} />
					<Route path="paypal-cancel" element={<PayPalCancel />} />
					<Route path="payment-success" element={<PaymentSuccess />} />
				</Route>
				<Route path="/unauth" element={<Unauth />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
