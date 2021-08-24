// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = (req, res) => {
	res.status(200).json(
		{
			"products": {
				"headphones": [{
						"name": "XX99 MARK II",
						"type": "headphones",
						"description": "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
						"image": "images/home/tablet/image-header.jpg",
						"isNewProduct": true
					},
					{
						"name": "XX59",
						"type": "headphones",
						"description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, ad",
						"image": "images/category-headphones/desktop/image-xx59.jpg",
						"isNewProduct": false
					}
				],
				"earphones": [{
					"name": "YX1",
					"type": "earphones",
					"description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates corrupti enim.",
					"image": "images/home/desktop/image-earphones-yx1.jpg",
					"isNewProduct": false
				}],
				"speakers": [{
						"name": "ZX9",
						"type": "speakers",
						"description": "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
						"image": "images/home/desktop/image-speaker-zx9.png",
						"isNewProduct": false
					},
					{
						"name": "ZX7",
						"type": "speakers",
						"description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, nisi saepe.",
						"image": "images/home/desktop/image-speaker-zx7.jpg",
						"isNewProduct": false
					}
		
				]
			}
		}
	)
}
export default handler