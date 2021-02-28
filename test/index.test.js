const app = require('../index')
const request = require("supertest");

describe("Testing all url shortenining routes",()=>{
	it("it should get shortened url",async (done)=>{
		await request(app).post('/shorten')
		.send({
			url:'https://www.nestjs.com',
			description:'This is nest website'
		})
		.expect(200)
		.then((res)=>expect(res.body.message).toEqual("Success"))
		 done();
	})

	it("throw error for invalid id",async (done)=>{
		await request(app).get('/abcdeedcba')
		.expect(200)
		.then((response)=>{
			expect(response.body.message).toEqual("Error")
			expect(response.body.error).toEqual("Invalid Id")
		})
		 done();
	})

	it('it checks for valid body in /shorten POST route', async (done)=>{
		await request(app).post('/shorten')
		.send({
			url:"localhost",
			description:232
		})
		.expect(200)
		.then((res)=>{
			expect(res.body.message).toEqual("Error")
			expect(res.body.error).toEqual("Invalid body")
		})
		done()
	})

	it('it return all the shorted urls', async (done)=>{
		await request(app).get('/all-urls')
		.expect(200)
		.then((res)=>{
			expect(res.body.message).toEqual("Success")
			expect(Array.isArray(res.body.data)).toEqual(true)
		})
		done()
	})
})