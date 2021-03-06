'use strict';
const bragg = require('../');
const app = bragg();

app.use(ctx => {
	if (ctx.path === '/test') {
		return Promise.resolve();
	} else if (ctx.path === '/foo') {
		ctx.body = 'Bar';
	} else if (ctx.path === '/foo-bar') {
		ctx.body = Promise.resolve('Foo Bar');
	} else if (ctx.path === '/foo-bar-baz') {
		return Promise.resolve('Foo');
	} else if (ctx.path === '/error') {
		throw new Error('something went wrong internally');
	} else {
		ctx.throw(404, 'Resource not found');
	}
});

app.use((ctx, result) => {
	if (result) {
		return Promise.resolve(result + ' Bar');
	}
});

app.use((ctx, result) => {
	if (result) {
		ctx.body = result + ' Baz';
	}
});

exports.handler = app.listen();
