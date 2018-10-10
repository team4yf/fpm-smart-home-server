const Fpm = require('yf-fpm-server').Fpm;
const uuidv4 = require('uuid/v4');
const path = require('path');
const Views = require('koa-views');
const { builder } = require('./logic');

const fpm = new Fpm();

// const biz = fpm.createBiz('0.0.1');

const router = fpm.createRouter();

const logic = builder(fpm);

const LOCAL = path.join(__dirname, '..')

const app = fpm.app

app.use(Views(path.join(LOCAL, 'views'), {
    extension: 'html',
    map: { html: 'nunjucks' },
}))

router.get('/auth', async (ctx, next) =>{
    try{
        await ctx.render('login.html', { data: ctx.request.query});
    }catch(e){
        console.error(e);
        ctx.body = { error: 'ops'}
    }
});
const mem = {};
const tokens = {};
router.post('/auth', async (ctx, next) =>{
    const { sn, client_id, response_type, state, tinyId, redirect_uri } = ctx.request.body;
    // TODO: bind the sn with the tinyId and the client_id
    // should get token by the tinyId

    try{
        mem[tinyId] = mem[tinyId] || uuidv4()
        ctx.redirect(redirect_uri + `?${response_type}=${mem[tinyId]}&state=${state}`)
    }catch(e){
        console.error(e);
        ctx.body = { error: 'ops'}
    }
});

router.get('/auth/token', async (ctx, next) => {
    // console.log('get token', ctx.request.query);
    const { code } = ctx.request.query;
    const access_token = uuidv4();
    const refresh_token = uuidv4();
    tokens[code] = access_token;
    console.log(mem, tokens);
    ctx.body = {
        access_token,
        scope: '',
        token_type: 'code',
        refresh_token
    }
});

router.post('/', async (ctx, next) =>{
    let postData = ctx.request.body
    // console.log(postData);
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