import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { request, gql } from 'graphql-request';

export interface Product {
	id: string;
	name: string;
	slug: string;
	info: string;
	ingredients: string;
	instructions: string;
	image: {
		url: string;
	}
	category: string;
}

interface Response {
	cocktails: Product[]
}

const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			const response: Response = await request(
				'https://api-us-east-1.graphcms.com/v2/cl4ji8xe34tjp01yrexjifxnw/master',
				`{ 
					cocktails {
						id
						name
						slug
						info
						ingredients
						instructions
						image {
							url
						}
						category
						}
					}
				`
			);

			console.info(response.cocktails);
			setProducts(response.cocktails);
		};

		fetchProducts();
	}, []);

	return (
		<div className="container">
			<button className="btn" onClick={() => navigate(-1)}>
				Go Back
			</button>
			<div className="title">
				<h1>CockTails</h1>
			</div>
			<div className="cocktails-container">
				{products.map((product) => (
					<div key={product.id} className="cocktail-card">
						<img src={product.image.url} alt="" className="cocktail-img" />
						<div className="cocktail-info">
							<div className="content-text">
								<h2 className="cocktail-name">{product.name}</h2>
								<span className="info">{product.info}</span>
							</div>
							<Link to={`/products/${product.slug}`}>
								<div className="btn">View Details</div>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;