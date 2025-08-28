export default function OrdersPage() {
	const orders = [
		{
			id: 'ORD001',
			date: '2024-07-20',
			total: 129.98,
			status: 'Delivered',
			items: [{ name: 'Classic White Tee', quantity: 1, price: 29.99 }],
		},
	]

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Your Orders</h1>
			<div className="space-y-4">
				{orders.map((order) => (
					<div key={order.id} className="border rounded-lg p-6">
						<div className="flex justify-between items-start mb-4">
							<div>
								<h3 className="font-semibold">Order #{order.id}</h3>
								<p className="text-sm text-muted-foreground">{order.date}</p>
							</div>
							<div className="text-right">
								<p className="font-semibold">${order.total}</p>
								<p className="text-sm text-muted-foreground">{order.status}</p>
							</div>
						</div>
						<div className="space-y-2">
							{order.items.map((item, index) => (
								<div key={index} className="flex justify-between">
									<span>
										{item.name} x{item.quantity}
									</span>
									<span>${item.price}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
