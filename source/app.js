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

router.post('/auth', async (ctx, next) =>{
    const { sn, client_id, response_type, state, tinyId, redirect_uri } = ctx.request.body;
    // TODO: bind the sn with the tinyId and the client_id
    // should get token by the tinyId

    try{
        const code = `${sn}-${tinyId}-${ new Date().getTime()}`
        console.log(code);
        ctx.redirect(redirect_uri + `?${response_type}=${code}&state=${state}`)
    }catch(e){
        console.error(e);
        ctx.body = { error: 'ops'}
    }
});

router.get('/auth/token', async (ctx, next) => {
    // console.log('get token', ctx.request.query);
    const { code, refresh_token } = ctx.request.query;
    if(code){
        // first auth
        const info = code.split('-');
        const access_token = `${info[0]}-${info[1]}-${ new Date().getTime() }`;
        const new_refresh_token = `${access_token}`;
        console.log(access_token);
        ctx.body = {
            access_token,
            scope: '',
            token_type: 'code',
            refresh_token: new_refresh_token,
        }
    }else if(refresh_token){
        // refresh the token
        console.log('refresh_token', refresh_token);
        ctx.body = {
            access_token: refresh_token,
            scope: '',
            token_type: 'code',
            refresh_token
        }
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
    console.log('Ready to go...')
});