const controller = require('./controller');
const moment = require('moment');
const userType = require('@libs/config/listType/userType');

module.exports = class userCtrl extends controller{
    constructor(ctx){
        super(ctx);
        // this.ctx = ctx;
    }

    async userInfo(){
        try {
            let listUser = await this.model.users.findAll({ plain: true });
            this.ctx.body = listUser.get();
        } catch (error) {
            console.log(error);
        }
        
    }

    async insertUser(){
        try {
            //validate
            let validate = this.validate(this.ctx.request.body, {
                'account': 'required',
                'password': 'required|min:6|max:30',
                'name': 'required',
                'email': 'required|email',
                'phone': 'required',
                'gender': 'required',
            }, {
                'account.required': 'account không được bỏ trống',
                'name.required': 'name không được bỏ trống',
                'email.required': 'email không được bỏ trống',
                'phone.required': 'phone không được bỏ trống',
                'email.email': 'email không đúng định dạng'
            });
            if(validate.fails()){
                this.response(validate.messages(), 422);
                return false;
            }

            //thuc hien insert
            await this.model.users.create({
                'account': this.ctx.body.account,
                'password': this.myFunc.makehash(this.ctx.body.password),
                'name': this.ctx.body.name,
                'email': this.ctx.body.email,
                'phone': this.ctx.body.phone || '',
                'avatar': null,
                'status': userType.CONST_STATUS_AVAILABLE,
                'createdAt': moment().format('YYYY-MM-DD HH:hh:ss'),
                'updatedAt': moment().format('YYYY-MM-DD HH:hh:ss'),
            })
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(){
        try {
            
        } catch (error) {
            
        }
    }

    async deleteUser(){
        try {
            
        } catch (error) {
            
        }
    }
}