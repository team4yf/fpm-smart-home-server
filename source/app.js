const Fpm = require('yf-fpm-server').Fpm;
const { builder } = require('./logic');
const fpm = new Fpm();

const biz = fpm.createBiz('0.0.1');

const router = fpm.createRouter();

const logic = builder(fpm);


router.get('/auth', async (ctx, next) =>{
    const { client_id, tinyId, redirect_uri } = ctx.request.query;
    try{
        console.log(redirect_uri + `?token=${'abc'}`)
        ctx.redirect(redirect_uri + `?token=${'abc'}`)
    }catch(e){
        console.error(e);
        ctx.body = { error: 'ops'}
    }
});

router.post('/', async (ctx, next) =>{
    let postData = ctx.request.body
    console.log(postData);
    
    try{
      const rsp = await logic(postData);
      ctx.body = rsp
    }catch(e){
        console.error(e);
        ctx.body = { error: 'ops'}
    }
});

fpm.bindRouter(router)

fpm.run().then( () => {
    console.log('ok~')
});