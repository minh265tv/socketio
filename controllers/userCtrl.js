const controller = require('./controller');

module.exports = class userCtrl extends controller{
    constructor(ctx){
        super();
        this.ctx = ctx;
    }

    async userInfo(){
        try {
            let listUser = await this.model.users.findAll({ plain: true });
            this.ctx.body = listUser.get();
        } catch (error) {
            console.log(error);
        }
        
    }
}