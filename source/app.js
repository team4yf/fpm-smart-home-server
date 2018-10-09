const Fpm = require('yf-fpm-server').Fpm;
const { logic } = require('./logic');
const fpm = new Fpm();

const biz = fpm.createBiz('0.0.1');

const router = fpm.createRouter();

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